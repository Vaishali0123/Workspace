"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Line, LineChart, YAxis } from "recharts";
import React, { useCallback, useEffect, useState } from "react";
import { Bar, CartesianGrid, XAxis } from "recharts";
import { RiArrowDropDownLine } from "react-icons/ri";
import { API } from "@/app/utils/helpers";
import axios from "axios";
import { useAuthContext } from "@/app/Auth/Components/auth";
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
  // Retrieve `userId`
  const userId = data?.id;

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
  // Retrieve & decode `comdata`
  // const comdataString = searchParams.get("comdata");

  // const comdata = comdataString
  //   ? JSON.parse(decodeURIComponent(comdataString))
  //   : [];

  const click = 0;

  // get community
  const fetchCommunity = async () => {
    if (hasFetched) return; // Prevent multiple API calls
    try {
      const res = await axios.get(`${API}/getcommunities/${data?.id}`);
      console.log(res?.data, "ii");
      if (res?.data?.success) {
        setComData(res?.data?.data?.comdata);
        setCommunityId(res?.data?.data?.comdata?.[0]?._id);
        setTopicId(res?.data?.data?.comdata?.[comindex]?.topics?.[0]?._id);
        setHasFetched(true); // Mark as fetched
        // if (comdata.length > 0) {
        //   fetchComAnalytics(res?.data?.data?.comdata?.[0]?._id);
        // }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Get Community analytics
  const fetchComAnalytics = useCallback(
    async (communityId: string) => {
      // setLoading(true);
      try {
        // const res = await axios.post(
        //   `${API}/comanalytics/${data?.id}/${communityId}`
        // );
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
  useEffect(() => {
    if (userId) {
      fetchCommunity();
    }
  }, [userId]);
  // const chartDataes = [
  //   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  //   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  //   { browser: "other", visitors: 190, fill: "var(--color-other)" },
  // ];
  // const chartConfiges = {
  //   visitors: {
  //     label: "Visitors",
  //   },
  //   chrome: {
  //     label: "Chrome",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   safari: {
  //     label: "Safari",
  //     color: "hsl(var(--chart-2))",
  //   },
  //   firefox: {
  //     label: "Firefox",
  //     color: "hsl(var(--chart-3))",
  //   },
  //   edge: {
  //     label: "Edge",
  //     color: "hsl(var(--chart-4))",
  //   },
  //   other: {
  //     label: "Other",
  //     color: "hsl(var(--chart-5))",
  //   },
  // } satisfies ChartConfig;

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

  // const chartDatas = [{ month: "january", desktop: 1260, Active_member: 570 }];
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

  useEffect(() => {
    if (communityId && topicId) {
      fetchPosts();
      fetchComAnalytics(communityId);
    }
  }, [communityId, topicId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API}/getpost/${communityId}/${topicId}`
      );
      if (response.data?.success) {
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
  // useEffect(() => {
  //   if (postData.length > 0) {
  //     setCurrentAnalyt("Post Analytics");
  //   } else {
  //     setCurrentAnalyt("Community Analytics");
  //   }
  // }, [postData]);
  // const totalVisitors = chartData[0].new_member + chartData[0].Active_member;
  // console.log(UserId, "hi");
  return (
    <div className="h-full w-full">
      <div className="w-full select-none cursor-pointer h-[60px] justify-between items-center px-2 flex gap-2">
        <div className="p-1 px-2 h-fit font-semibold text-[#1d1d1d] ">
          Overview
        </div>
        {/* <div className=" items-center px-2 flex gap-2">
          <div
            onClick={() => setClick(0)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 0 ? "bg-[#307fff] text-white border-[#307fff]" : " "
            }`}
          >
            Community
          </div> */}
        {/* <div
            onClick={() => setClick(1)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 1 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Store
          </div> */}
        {/* <div
            onClick={() => setClick(2)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 2 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Prosite
          </div> */}
        {/* </div> */}
      </div>
      {click === 0 ? (
        <div className="w-full h-[calc(100%-60px)] pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex gap-2 ">
          <div className=" p-2 w-[30%] pn:max-sm:h-full pn:max-sm:w-full rounded-3xl border sm:overflow-hidden bg-white space-y-1 ">
            {/* select community */}
            <div className=" bg-slate-50 relative h-[60px] rounded-t-3xl border p-2">
              <div
                onClick={() => setOpen(!open)}
                className="flex w-full justify-between items-center border p-1 rounded-t-2xl bg-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-xl border">
                    <img
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
                <div className="py-2 rounded-b-2xl border  overflow-auto">
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
            {/* <div className="h-[150px] w-full -z-40 border ">
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
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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

                {/* <div className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border">
                  All
                </div>
                <div className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border">
                  New challenge
                </div> */}
              </div>
            </div>

            {/* Analytics  */}
            <div className=" h-[calc(100%-120px)] w-full border overflow-hidden rounded-b-2xl">
              {/* <div className="flex gap-2 h-[40px] border-b items-center">
                <div className="p-1 px-2 rounded-xl text-[14px]">Post</div>
                <div className="p-1 px-2 rounded-xl text-[14px]">States</div>
              </div> */}
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
                            selectedPost === f?._id && "bg-blue-300  px-1"
                          } flex items-center justify-between`}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-[40px] w-[40px] border rounded-[10px]">
                              {f?.post?.[0]?.type?.startsWith("image") ? (
                                <img
                                  src={f?.post?.[f?.post?.length - 1]?.content}
                                  alt="Post Image"
                                  className="h-[40px] w-[40px] rounded-xl"
                                />
                              ) : (
                                <img
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
            <div className="h-[50px] bg-white rounded-xl border px-2 flex items-center justify-center w-full font-semibold">
              <div>{currentAnalyt}</div>
            </div>

            <div className="h-[calc(100%-60px)] bg-white  w-full relative  overflow-hidden border rounded-2xl">
              {currentAnalyt === "Community Analytics" ? (
                <Card className="h-[calc(100%-100px)] w-full shadow-none  border-none">
                  <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6"></div>
                    <div className="flex">
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
                </Card>
              ) : (
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
      ) : null}
    </div>
  );
};

export default Page;
