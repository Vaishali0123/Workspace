"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Line, LineChart, Tooltip, YAxis } from "recharts";
import React, { useCallback, useEffect, useState } from "react";
import { Bar, CartesianGrid, XAxis } from "recharts";
import { RiArrowDropDownLine, RiLoaderLine } from "react-icons/ri";
import { API, errorHandler } from "@/app/utils/helpers";
import axios from "axios";
import { useAuthContext } from "@/app/Auth/Components/auth";
import Link from "next/link";
import { useDispatch } from "react-redux";

// import Lottie from "lottie-react";
// import comingSoonAnimation from "../../assets/Coming_Soon.json";
import {
  setMaxmembers,
  setOnecom,
  setPost,
} from "@/app/redux/slices/leastparams";
import { BsPeople } from "react-icons/bs";
import { PiClipboardText } from "react-icons/pi";
import { FiShoppingBag } from "react-icons/fi";
import { MdPendingActions } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useFetchStoreAnalyticsQuery } from "@/app/redux/slices/storeanalytics";
import { LuCirclePlus } from "react-icons/lu";
import { IoStorefrontOutline } from "react-icons/io5";

interface CommunityAnalytics {
  createdAt: Date;
  newmembers: Array<string>;
  activemembers: Array<string>;
  userleft: Array<string>;
  visitor: Array<string>;
  reports: Array<string>;
}
interface PostAnalytics {
  date: Date;
  views: number;
  clicks: number;
  shares: number;
  impressions: number;
}

interface Topics {
  nature: string;
  postcount: number;
  _id: string;
  topicName: string;
}
interface Post {
  type: string;
  content: string;
  thumbnail?: string;
}

interface PostData {
  _id: string;
  title: string;
  description: string;
  likes: number;
  commentcount: number;
  analytics: {
    views: number;
    shares: number;
    clicks: number;
    impressions: number;
  }[];
  post: Post[];
}

interface CommunityData {
  _id: string;
  communityName: string;
  dp: string;
  dps: string;
  topic: { nature: string }[];
  postcount: number;
  memberCount: number;
  topics: Topics[];
}
const Page = () => {
  const { data } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(0);
  // Retrieve `userId`
  const userId = data?.id;
  const dispatch = useDispatch();
  const [comindex, setComindex] = useState(0);
  const [postData, setPostData] = useState<PostData[]>([]);
  const [comdata, setComData] = useState<CommunityData[]>([]);
  const [hasFetched, setHasFetched] = useState<boolean>(false); // Track fetch state
  const [communityId, setCommunityId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [comAnalyt, setComAnalyt] = useState([]);
  const [postAnalyt, setPostAnalyt] = useState([]);
  const [currentAnalyt, setCurrentAnalyt] = useState("Community Analytics");
  const [selectedPost, setSelectedPost] = useState("");
  const shouldSkip = !userId;
  // const showPopup = true;
  const { data: StoreAnalytics, isLoading } = useFetchStoreAnalyticsQuery(
    { userId, nav: "Overview" },
    {
      skip: !!shouldSkip,
    }
  );
  const fetchCommunity = async () => {
    if (hasFetched) return; // Prevent multiple API calls
    try {
      const res = await axios.get(`${API}/getcommunities/${data?.id}`);

      if (res?.data?.success) {
        if (res?.data?.data?.comdata?.length > 0) {
          dispatch(setOnecom(true));
          dispatch(setMaxmembers(res?.data?.data?.maxmembers));
        }
        setComData(res?.data?.data?.comdata);
        setCommunityId(res?.data?.data?.comdata?.[0]?._id);
        setTopicId(res?.data?.data?.comdata?.[comindex]?.topics?.[0]?._id);
        setHasFetched(true); // Mark as fetched
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchCommunity();
    }
  }, [userId]);
  //Get Community analytics
  const fetchComAnalytics = useCallback(
    async (communityId: string) => {
      try {
        const res = await axios.get(
          `${API}/getcomanalytics/${data?.id}/${communityId}`
        );
        setComAnalyt(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
      // setLoading(false);
    },
    [communityId]
  );
  let chartData = comAnalyt?.map((entry: CommunityAnalytics) => {
    // Format the date to match the 'YYYY-MM-DD' format
    const formattedDate = new Date(entry.createdAt).toISOString().split("T")[0];

    // Assuming that newmembers and activemembers have counts for the new_member and Active_member values
    const newMemberCount = entry.newmembers.length;
    const activeMemberCount = entry.activemembers.length;
    const userLeftCount = entry.userleft.length;
    const visitorCount = entry.visitor.length;
    const reportsCount = entry.reports.length;

    return {
      date: formattedDate,
      new_member: newMemberCount,
      Active_member: activeMemberCount,
      user_left: userLeftCount,
      visitor: visitorCount,
      reports: reportsCount,
    };
  });

  let chartConfig: ChartConfig = {
    views: {
      label: "Page Views",
    },
    new_member: {
      label: "new member",
      color: "hsl(var(--chart-1))",
    },
    Active_member: {
      label: "Active member",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("new_member");
  const total = React.useMemo(
    () => ({
      new_member: chartData.reduce((acc, curr) => acc + curr.new_member, 0),
      Active_member: chartData.reduce(
        (acc, curr) => acc + curr.Active_member,
        0
      ),
      total: chartData.reduce((acc, curr) => acc + curr.Active_member, 0),
    }),
    []
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API}/getpost/${communityId}/${topicId}`
      );

      if (response.data?.success) {
        if (response.data.posts?.length > 0) {
          dispatch(setPost(response?.data?.posts?.length));
        }
        setPostData(response.data.posts);
      }
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const fetchpostanalytics = async (postId: string) => {
    try {
      const res = await axios.get(
        `${API}/getpostanalytics/${data?.id}/${postId}/${communityId}`
      );

      if (res?.data?.success) {
        setPostAnalyt(res.data.data?.analytics || []);
        setCurrentAnalyt("Post Analytics");
        chartConfig = {
          views: {
            label: "Page Views",
            color: "hsl(var(--chart-1))",
          },
          clicks: {
            label: "Clicks",
            color: "hsl(var(--chart-2))",
          },
          impressions: {
            label: "Impressions",
            color: "hsl(var(--chart-3))",
          },
          shares: {
            label: "Shares",
            color: "hsl(var(--chart-4))",
          },
        };
        chartData =
          res.data.data?.analytics?.map((entry: PostAnalytics) => ({
            date: new Date(entry.date).toISOString().split("T")[0], // Format 'YYYY-MM-DD'
            views: entry?.views || 0,
            clicks: entry?.clicks || 0,
            impressions: entry?.impressions || 0,
            shares: entry?.shares || 0,
          })) || [];
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (communityId && topicId) {
      fetchPosts();
      fetchComAnalytics(communityId);
    }
  }, [communityId, topicId]);

  // useEffect(() => {
  //   if (userId) {
  //     fetchCommunity();
  //   }
  //   if (communityId && topicId) {
  //     fetchPosts();
  //     fetchComAnalytics(communityId);
  //   }
  // }, [communityId, topicId, userId]);

  const chartDatastore = StoreAnalytics?.storeAnalytics
    ? [...StoreAnalytics.storeAnalytics].reverse()
    : [];
  // const chartDatastore = [
  //   {
  //     date: "2025-03-18",
  //     visitors: 120,
  //     addedtocart: 80,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-19",
  //     visitors: 150,
  //     addedtocart: 90,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-20",
  //     visitors: 180,
  //     addedtocart: 100,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-21",
  //     visitors: 200,
  //     addedtocart: 120,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-22",
  //     visitors: 220,
  //     addedtocart: 140,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-23",
  //     visitors: 250,
  //     addedtocart: 160,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-24",
  //     visitors: 270,
  //     addedtocart: 180,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  //   {
  //     date: "2025-03-25",
  //     visitors: 300,
  //     addedtocart: 200,
  //     totalorders: 1,
  //     cancelledorders: 0,
  //   },
  // ];
  return (
    <div className="h-full w-full">
      <div className="w-full select-none cursor-pointer h-[60px] justify-between items-center px-2 flex gap-2">
        <div className="p-1 px-2 h-fit font-semibold text-[#1d1d1d] ">
          Overview
        </div>
        <div className=" items-center px-2 flex gap-2">
          <div
            onClick={() => setClick(0)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 0 ? "bg-[#307fff] text-white border-[#307fff]" : " "
            }`}
          >
            Community
          </div>
          <div
            onClick={() => {
              setClick(1);
              setCurrentAnalyt("Store Analytics");
            }}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 1 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Store
          </div>
          {/* <div
            onClick={() => setClick(2)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 2 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Prosite
          </div> */}
        </div>
      </div>
      {click === 0 ? (
        comdata?.length > 0 ? (
          <div className="w-full h-[calc(100%-60px)]  pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex gap-2 ">
            <div className="  w-[30%] pn:max-sm:h-full pn:max-sm:w-full rounded-3xl sm:overflow-hidden bg-white space-y-1 ">
              {/* select community */}
              <div className=" bg-slate-50 relative h-[60px] rounded-t-3xl border p-2">
                <div
                  onClick={() => setOpen(!open)}
                  className="flex w-full justify-between items-center border p-1 rounded-t-2xl bg-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[30px] h-[30px] rounded-xl border">
                      <img
                        loading="lazy"
                        alt="dps"
                        src={comdata?.[comindex]?.dp}
                        className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                      />
                    </div>
                    <div className="whitespace-nowrap text-[14px] text-ellipsis">
                      {comdata?.[comindex]?.communityName}
                    </div>
                  </div>
                  <RiArrowDropDownLine />
                </div>
                {open ? (
                  <div className="py-2 rounded-b-2xl border   overflow-auto">
                    {comdata.map((d, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          setComindex(i);
                          setCommunityId(d?._id);
                          fetchComAnalytics(d?._id);
                          setTopicId("");
                          setOpen(!open);
                        }}
                        className="flex w-full justify-between items-center p-1 bg-white"
                      >
                        <div className="flex items-center bg-white gap-2">
                          <div className="w-[30px] h-[30px] rounded-xl border">
                            <img
                              loading="lazy"
                              alt="dps"
                              src={d?.dp}
                              className=" bg-contain bg-slate-400 rounded-xl w-[30px] h-[30px]"
                            />
                          </div>
                          <div className="">{d?.communityName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              {/* poplarity  */}
              {/* <div className="h-[150px]  w-full -z-40 border ">
                <Card className="flex h-full -z-20 flex-col shadow-none p-2 border-none rounded-3xl">
                  <CardContent className="flex h-full flex-1 items-center pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto h-full flex aspect-square w-full max-w-[250px]"
                    >
                      <RadialBarChart
                        data={chartDatas}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                        className="w-full h-full  bg-white  "
                      >
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                          className="pt-10"
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) - 16}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {totalVisitors.toLocaleString()}%
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 4}
                                      className="fill-muted-foreground"
                                    >
                                      Popularity
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                        <RadialBar
                          dataKey="desktop"
                          stackId="a"
                          cornerRadius={5}
                          fill="var(--color-desktop)"
                          className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                          dataKey="Active_member"
                          fill="var(--color-Active_member)"
                          stackId="a"
                          cornerRadius={5}
                          className="stroke-transparent stroke-2"
                        />
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div> */}
              {/* topic  */}
              <div className="p-2 hover:bg-slate-50 active:bg-slate-100  h-[50px] w-full border flex justify-between items-center">
                Topics
                <div className="flex gap-2 items-center">
                  {comdata?.[comindex]?.topics
                    ?.filter(
                      (d: Topics) =>
                        d.nature != "chats" &&
                        d.nature != "Chats" &&
                        d?.topicName != "All"
                    )
                    .map((d: Topics, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          setTopicId(d._id);
                          setCommunityId(comdata[comindex]?._id);
                        }}
                        className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border"
                      >
                        {d?.topicName}
                      </div>
                    ))}
                </div>
              </div>
              {/* Analytics  */}
              <div className=" h-[calc(100%-280px)] w-full border overflow-hidden rounded-b-2xl">
                <div className="h-[calc(100%-40px)] p-1 w-full  overflow-auto">
                  {/* post  */}
                  {postData?.length > 0 ? (
                    postData?.map(
                      (f, i) =>
                        f?.post?.length > 0 && (
                          <div
                            key={i}
                            onClick={(e) => {
                              e.preventDefault();

                              if (selectedPost === f?._id) {
                                return;
                              }
                              setSelectedPost(f?._id);
                              fetchpostanalytics(f?._id);
                            }}
                            className={`gap-2 w-full h-[50px] border-b ${
                              selectedPost === f?._id
                                ? "bg-blue-100  px-1"
                                : "bg-white px-1"
                            } flex items-center justify-between`}
                          >
                            <div className="flex gap-2 items-center">
                              <div className="h-[40px] w-[40px] border rounded-[10px]">
                                {f?.post?.[0]?.type?.startsWith("image") ? (
                                  <img
                                    loading="lazy"
                                    src={
                                      f?.post?.[f?.post?.length - 1]?.content
                                    }
                                    alt="Post Image"
                                    className="h-[40px] w-[40px] rounded-xl"
                                  />
                                ) : (
                                  <img
                                    loading="lazy"
                                    src={
                                      f?.post?.[f?.post?.length - 1]?.thumbnail
                                    }
                                    alt="Post Image"
                                    className="h-[40px] w-[40px] rounded-xl"
                                  />
                                )}
                              </div>
                              <div className="text-[12px] whitespace-nowrap text-ellipsis truncate w-[110px] ">
                                {f?.title ? f?.title : "No title"}
                              </div>
                            </div>
                            <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white ">
                              {f?.analytics?.length > 0
                                ? (() => {
                                    const latest =
                                      f.analytics[f.analytics.length - 1] || {};

                                    const engagementRate =
                                      (((latest?.views || 0) +
                                        (latest?.shares || 0) +
                                        (latest?.clicks || 0)) /
                                        (100 + (latest?.impressions || 0))) *
                                      100;

                                    return engagementRate.toFixed(1) + "%"; // Display with 2 decimal places
                                  })()
                                : "N/A"}
                            </div>
                          </div>
                        )
                    )
                  ) : topicId === "" ? (
                    <div className="text-black text-[12px] text-center">
                      Click on above topic to see posts
                    </div>
                  ) : (
                    <div className="text-black text-[12px] text-center">
                      No Posts Available
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-full w-[70%] pn:max-sm:w-full   pn:max-sm:h-full sm:overflow-auto  space-y-2">
              {/* header  */}
              <div className="h-[50px] bg-white rounded-t-xl border px-2 flex items-center  w-full ">
                <div>{currentAnalyt}</div>
              </div>

              <div className="h-[calc(100%-60px)] bg-white w-full relative overflow-hidden border rounded-b-2xl">
                {currentAnalyt === "Community Analytics" ? (
                  <Card className="h-[calc(100%-100px)]  w-full shadow-none  border-none">
                    <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                      <div className="flex flex-1 flex-col  justify-center gap-1 px-6 py-5 sm:py-6"></div>

                      <div className="flex ">
                        {["new_member", "Active_member"].map((key) => {
                          const chart = key as keyof typeof chartConfig;
                          return (
                            <button
                              key={chart}
                              data-active={activeChart === chart}
                              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                              onClick={() => setActiveChart(chart)}
                            >
                              <span className="text-xs text-muted-foreground">
                                {chartConfig[chart].label}
                              </span>
                              <span className="text-lg font-bold leading-none sm:text-3xl">
                                {total[
                                  key as keyof typeof total
                                ].toLocaleString()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {comAnalyt?.length > 0 ? (
                      <CardContent className="px-2 h-full ">
                        <ChartContainer
                          config={chartConfig}
                          className="aspect-auto h-full w-full"
                        >
                          <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                              left: 12,
                              right: 12,
                            }}
                          >
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="date"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              minTickGap={32}
                              tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                });
                              }}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  className="w-[150px]"
                                  nameKey="views"
                                  labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    );
                                  }}
                                />
                              }
                            />
                            <Bar
                              dataKey={activeChart}
                              fill={`var(--color-${activeChart})`}
                            />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    ) : (
                      <div className=" font-bold pt-4 self-center flex items-center text-slate-500 justify-center">
                        No Analytics Available
                      </div>
                    )}
                  </Card>
                ) : postAnalyt?.length > 0 ? (
                  <Card className="mt-4 h-[400px] w-full">
                    {/* <CardHeader>
            <CardTitle>Line Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader> */}
                    <CardContent className="h-full w-full rounded-3xl">
                      <ChartContainer
                        className="h-full w-full rounded-3xl"
                        config={chartConfig}
                      >
                        <LineChart
                          data={postAnalyt}
                          accessibilityLayer
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                          className=" h-full w-full flex items-center"
                        >
                          <CartesianGrid
                            className="h-full w-full"
                            vertical={true}
                            horizontal={true}
                            // height={100}
                          />
                          <XAxis
                            // height={100}
                            className="h-full w-full"
                            dataKey="date"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                              })
                            }
                          />
                          <YAxis
                            height={100}
                            className="h-full w-full"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => value.toLocaleString()}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                          />
                          <Line
                            dataKey="impressions"
                            type="monotone"
                            stroke="yellow"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            dataKey="views"
                            type="monotone"
                            stroke="blue"
                            strokeWidth={2}
                            dot={true}
                          />
                          <Line
                            dataKey="shares"
                            type="monotone"
                            stroke="green"
                            strokeWidth={2}
                            dot={true}
                          />
                          <Line
                            dataKey="clicks"
                            type="monotone"
                            stroke="orange"
                            strokeWidth={2}
                            dot={true}
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                ) : (
                  <div className=" font-bold pt-4 self-center flex items-center text-slate-500 justify-center">
                    No Analytics Available
                  </div>
                )}
              </div>
              {/* <div className="h-[60px] w-full bg-white border rounded-2xl px-2 flex items-center justify-between">
              <div className="p-1 px-2 h-fit font-semibold text-[#1d1d1d] ">
                Topics
              </div>

              <div className=" items-center text-[14px] font-medium flex gap-2">
                <div className="p-1 px-4 h-fit border rounded-xl ">Post</div>
                <div className="p-1 px-4 h-fit border rounded-xl "> All</div>
              </div>
            </div>
            <div className="h-[500px] w-full  rounded-2xl">
              <Post />
            </div> */}
            </div>
          </div>
        ) : (
          <div className="w-full h-[calc(100%-60px)] bg-white pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex flex-col gap-2 items-center justify-center">
            <div className=" w-full  rounded-2xl space-y-2 flex items-center flex-col justify-center h-[100%] p-2">
              <div className="">
                <div className="rounded-xl items-center p-4 flex gap-2 ">
                  <IoStorefrontOutline className="text-[25px]" />

                  <div className="text-[25px] font-semibold">
                    Get Ready Earn with community
                  </div>
                </div>
                <div className="text-[12px] text-gray-500">
                  To create a topic, meet criteria: 150 members, 10% engagement.
                </div>
              </div>
              <div className="border rounded-2xl space-y-2  gap-2 p-4 w-[50%] bg-white">
                <div className="text-[#667085] space-y-2  ">
                  <div className="text-[12px] text-gray-500 ">
                    To be eligible for creating a store or uploading products,
                    users must first establish a community presence by creating
                    and contributing at least one post in the community.
                  </div>
                </div>
                <div className="text-[18px] font-semibold">Setup store</div>
                <div className="text-[12px] text-gray-500">
                  Use this personalized guide to get your store up and running
                </div>
                <div className="text-[12px] p-1 px-4 rounded-xl w-fit border">
                  0/3 completed
                </div>
                <div className="flex text-[12px] font-semibold bg-slate-50 p-2 flex-col gap-1 w-full">
                  Set up guide to get your store up and running
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                    {/* <FaRegCircleCheck /> */}
                    <LuCirclePlus />
                    Start with registering and verifying .
                  </div>
                  <Link
                    href="/main/CreateCommunity"
                    className="flex px-4 p-2 text-[14px] bg-blue-600 hover:bg-blue-400 active:bg-blue-500 text-white items-center justify-center rounded-xl"
                  >
                    <div> Create Community</div>
                  </Link>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                    {/* <FaRegCircleCheck /> */}
                    <LuCirclePlus />
                    Create Collection
                  </div>
                  {/* <div className="flex items-center gap-2 p-2 text-[12px] w-fit border rounded-xl bg-white">
                                  register now
                                </div> */}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 p-2 text-[14px] rounded-lg bg-white w-full">
                    {/* <FaRegCircleCheck /> */}
                    <LuCirclePlus />
                    Add your first product
                  </div>
                  {/* <div className="flex items-center gap-2 p-2 text-[12px] w-fit border rounded-xl bg-white">
                                  register now
                                </div> */}
                </div>
                <div className="flex items-center gap-2 p-2  text-[11px] text-[#363636] rounded-lg bg-white w-full">
                  Check Out our
                  <a className="text-blue-600 cursor-pointer ">
                    term & conditions
                  </a>
                  for store
                </div>
              </div>
            </div>
          </div>
        )
      ) : click === 1 ? (
        isLoading ? (
          <RiLoaderLine size={20} className="animate-spin" />
        ) : (
          <>
            {/* if you don't have a Store */}

            {(!StoreAnalytics?.data?.storeid ||
              !data?.isStoreVerified ||
              data?.isStoreVerified === "pending") && (
              <div className="w-full h-[calc(100%-60px)] bg-white  pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex flex-col gap-2 items-center justify-center">
                <div className="text-black font-semibold"> Create Store</div>
                <Link
                  href="/main/Store"
                  className="flex px-4 p-2 text-[14px] bg-blue-600 hover:bg-blue-400 active:bg-blue-500 text-white items-center justify-center rounded-xl"
                >
                  <div> Create Store</div>
                </Link>
              </div>
            )}
            {StoreAnalytics?.data?.storeid || data?.isStoreVerified ? (
              <div className="w-full h-[calc(100%-60px)] relative flex pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll gap-2 items-center justify-center">
                <div className="h-full w-[30%] flex items-center  justify-center">
                  {/* Left Overview Store portion */}
                  <div className="h-full w-full flex  flex-col  space-y-2  rounded-2xl">
                    <div className="w-full h-[150px] flex items-center  justify-center gap-2 rounded-2xl ">
                      {/* Upper 1st */}
                      <div className="w-[50%] flex flex-col justify-between  p-2 h-full bg-white border rounded-t-2xl">
                        <div className=" w-full flex items-center gap-2">
                          <div className="rounded-2xl bg-blue-100 w-10 h-10 flex justify-center items-center">
                            <PiClipboardText className="text-[#6DACE7] text-[25px]" />
                          </div>
                          <div className="text-[#667085] font-semibold">
                            Earnings
                          </div>
                        </div>
                        <div className="text-[25px] font-bold w-full text-center">
                          0
                        </div>
                        <div className=" text-[#ABABAB] text-[12px] w-full px-2">
                          5% in the last 1 month
                        </div>
                      </div>
                      {/* Upper 2nd */}
                      <div className="w-[50%] h-full flex flex-col justify-between p-2 bg-white border rounded-t-2xl">
                        <div className=" w-full flex items-center gap-2">
                          <div className="rounded-2xl bg-purple-100 w-10 h-10 flex justify-center items-center">
                            <BsPeople className="text-[#AA7AEB] text-[25px]" />
                          </div>
                          <div className="text-[#667085] font-semibold">
                            Customers
                          </div>
                        </div>
                        <div className="text-[25px] font-bold text-center w-full">
                          0
                        </div>
                        <div className=" text-[#ABABAB] text-[12px] w-full px-2">
                          3% in the last 1 month
                        </div>
                      </div>
                    </div>
                    {/* track order */}
                    <div className="w-full p-2 flex items-center justify-center  border bg-white">
                      <div className="flex px-2    w-[100%] justify-between items-center ">
                        {/* Status */}
                        <div className=" flex flex-col items-center ">
                          <div className="rounded-2xl bg-blue-100 w-10 h-10 flex justify-center items-center">
                            <FiShoppingBag className="text-blue-600 text-[20px]" />
                          </div>
                          <div className="text-[#667085] text-[14px] font-medium">
                            All orders
                          </div>
                          <div className="text-center">0</div>
                        </div>
                        <div className="flex flex-col items-center ">
                          <div className="rounded-full bg-red-100 w-10 h-10 flex justify-center items-center">
                            <MdPendingActions className="text-red-600 text-[20px]" />
                          </div>
                          <div className="text-[#667085] text-[14px] font-medium">
                            Pending
                          </div>
                          <div className="text-center">0</div>
                        </div>
                        <div className=" flex flex-col items-center">
                          <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                            <FaCircleCheck className="text-green-600 text-[20px]" />
                          </div>
                          <div className="text-[#667085] text-[14px] font-medium">
                            Completed
                          </div>
                          <div className="text-center">0</div>
                        </div>
                      </div>
                    </div>
                    <div className="border bg-white w-full h-[calc(100%-250px)] flex items-center justify-center rounded-b-2xl"></div>
                  </div>
                </div>

                <div className="h-full w-[70%] pn:max-sm:w-full   pn:max-sm:h-full sm:overflow-auto  space-y-2">
                  {/* header  */}
                  <div className="h-[50px] bg-white rounded-t-xl border px-2 flex items-center w-full">
                    <div>{currentAnalyt}</div>
                  </div>

                  <div className="h-[calc(100%-60px)] bg-white  w-full relative  overflow-hidden border rounded-b-2xl">
                    {currentAnalyt === "Store Analytics" ? (
                      <Card className="h-[calc(100%-100px)]  w-full shadow-none  border-none">
                        {chartDatastore?.length > 0 ? (
                          <CardContent className="flex h-full flex-1 items-center pb-0">
                            <div className="w-full">
                              <BarChart
                                width={500}
                                height={300}
                                data={chartDatastore}
                                margin={{ left: 12, right: 12 }}
                              >
                                <CartesianGrid
                                  vertical={false}
                                  strokeDasharray="2 2"
                                  stroke="#e5e7eb"
                                />
                                <XAxis
                                  dataKey="date"
                                  tickLine={false}
                                  axisLine={false}
                                  tickMargin={8}
                                  minTickGap={16}
                                  tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    });
                                  }}
                                />
                                <Tooltip
                                  formatter={(value, name) => {
                                    switch (name) {
                                      case "visitors":
                                        return [value, "Visitors"];
                                      case "addedtocart":
                                        return [value, "Added To Cart"];
                                      case "totalorders":
                                        return [value, "Orders"];
                                      case "cancelledorders":
                                        return [value, "Cancelled"];
                                      default:
                                        return [value, name];
                                    }
                                  }}
                                  labelFormatter={(value) =>
                                    new Date(value).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )
                                  }
                                />

                                <Bar
                                  dataKey="visitors"
                                  fill="#4f46e5"
                                  radius={[4, 4, 0, 0]}
                                  barSize={20}
                                />
                                <Bar
                                  dataKey="addedtocart"
                                  fill="#10b981"
                                  radius={[4, 4, 0, 0]}
                                  barSize={20}
                                />
                                <Bar
                                  dataKey="totalorders"
                                  fill="#facc15"
                                  radius={[4, 4, 0, 0]}
                                  barSize={20}
                                />
                                <Bar
                                  dataKey="cancelledorders"
                                  fill="#ef4444"
                                  radius={[4, 4, 0, 0]}
                                  barSize={20}
                                />
                              </BarChart>
                            </div>
                          </CardContent>
                        ) : (
                          <div className=" font-bold pt-4 self-center flex items-center text-slate-500 justify-center">
                            Register Store
                          </div>
                        )}
                      </Card>
                    ) : (
                      // <div className="rounded-2xl border border-gray-200 shadow-md p-4 bg-white">
                      //   <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      //     Visitors Overview
                      //   </h2>

                      //   <ResponsiveContainer width="100%" height={300}>
                      //     <LineChart
                      //       data={chartDatastore}
                      //       margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      //     >
                      //       <defs>
                      //         <linearGradient
                      //           id="lineGradient"
                      //           x1="0"
                      //           y1="0"
                      //           x2="0"
                      //           y2="1"
                      //         >
                      //           <stop
                      //             offset="0%"
                      //             stopColor="#6366f1"
                      //             stopOpacity={0.3}
                      //           />
                      //           <stop
                      //             offset="100%"
                      //             stopColor="#6366f1"
                      //             stopOpacity={0}
                      //           />
                      //         </linearGradient>
                      //       </defs>

                      //       <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      //       <XAxis
                      //         dataKey="date"
                      //         tickLine={false}
                      //         axisLine={false}
                      //         tickMargin={8}
                      //         tickFormatter={(value) => {
                      //           const date = new Date(value);
                      //           return date.toLocaleDateString("en-US", {
                      //             month: "short",
                      //             day: "numeric",
                      //           });
                      //         }}
                      //       />
                      //       <YAxis
                      //         dataKey="visitors"
                      //         tickLine={false}
                      //         axisLine={false}
                      //         tickMargin={8}
                      //       />
                      //       <Tooltip
                      //         contentStyle={{
                      //           backgroundColor: "#1f2937",
                      //           color: "#fff",
                      //           borderRadius: "8px",
                      //           border: "none",
                      //         }}
                      //       />
                      //       <Line
                      //         type="monotone"
                      //         dataKey="visitors"
                      //         stroke="#6366f1"
                      //         strokeWidth={3}
                      //         dot={{
                      //           r: 4,
                      //           stroke: "#6366f1",
                      //           strokeWidth: 2,
                      //           fill: "#fff",
                      //         }}
                      //         activeDot={{ r: 6 }}
                      //       />
                      //     </LineChart>
                      //   </ResponsiveContainer>
                      // </div>
                      <div className=" font-bold pt-4 self-center flex items-center text-slate-500 justify-center">
                        No Analytics Available
                      </div>
                    )}
                  </div>
                </div>

                {/* {showPopup && (
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center">
                  <Lottie
                    animationData={comingSoonAnimation}
                    className="w-40 h-40"
                  />

                  <p className="text-gray-600 mt-2 font-medium">
                    This feature is under development.
                  </p>
                </div>
              </div>
            )} */}
              </div>
            ) : (
              <div>No Store Analytics available</div>
            )}
          </>
        )
      ) : (
        click === 2 && (
          <div className="w-full h-[calc(100%-60px)] bg-white  pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex flex-col gap-2 items-center justify-center">
            <div className="text-black font-semibold">
              {" "}
              No Community Created
            </div>
            <Link
              href="/main/CreateCommunity"
              className="flex px-4 p-2 text-[14px] bg-blue-600 text-white items-center justify-center rounded-xl"
            >
              <div> prosite</div>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Page;
