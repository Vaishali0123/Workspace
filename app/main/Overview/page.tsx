"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart } from "lucide-react";
import { LineChart, Pie } from "recharts";
import {
  BarChart,
  Label,
  LabelList,
  Line,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import React, { useState } from "react";
import { Bar, CartesianGrid, XAxis } from "recharts";
import { BsPeople } from "react-icons/bs";
import { PiClipboardText } from "react-icons/pi";
import { FiShoppingBag } from "react-icons/fi";
import { FaAnglesRight } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

const Page = ({ UserId }: { UserId: string }) => {
  const [click, setClick] = useState<number>(0);
  const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
    { date: "2024-05-02", desktop: 293, mobile: 310 },
    { date: "2024-05-03", desktop: 247, mobile: 190 },
    { date: "2024-05-04", desktop: 385, mobile: 420 },
    { date: "2024-05-05", desktop: 481, mobile: 390 },
    { date: "2024-05-06", desktop: 498, mobile: 520 },
  ];

  const chartDataes = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];
  const chartConfiges = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
  const chartConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
    total: {
      label: "total",
      color: "yellow",
    },
  } satisfies ChartConfig;

  const chartDatas = [{ month: "january", desktop: 1260, mobile: 570 }];
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");
  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
      total: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  const totalVisitors = chartData[0].desktop + chartData[0].mobile;
  // console.log(UserId, "hi");
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
            onClick={() => setClick(1)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 1 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Store
          </div>
          <div
            onClick={() => setClick(2)}
            className={`p-2 px-4 text-[14px] h-fit border duration-200 rounded-xl ${
              click === 2 ? "bg-[#307fff] text-white border-[#307fff]" : ""
            }`}
          >
            Prosite
          </div>
        </div>
      </div>
      {click === 0 ? (
        <div className="w-full h-[calc(100%-60px)] pn:max-sm:flex-col pn:max-sm:p-2 pn:max-sm:overflow-auto pn:max-sm:overflew-y-scroll flex gap-2 ">
          <div className=" p-2 w-[30%] pn:max-sm:h-full pn:max-sm:w-full rounded-3xl border sm:overflow-hidden bg-white space-y-1 ">
            {/* select community */}
            <div className=" bg-slate-50 h-[60px] rounded-t-3xl border p-2">
              <div className="flex w-full justify-between items-center border p-1 rounded-t-2xl bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-xl border"></div>
                  <div className="">community name</div>
                </div>
                <RiArrowDropDownLine />
              </div>
            </div>
            {/* poplarity  */}
            <div className="h-[150px] w-full border ">
              <Card className="flex h-full flex-col shadow-none p-2 border-none rounded-3xl">
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
                        dataKey="mobile"
                        fill="var(--color-mobile)"
                        stackId="a"
                        cornerRadius={5}
                        className="stroke-transparent stroke-2"
                      />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            {/* topic  */}
            <div className="p-2 hover:bg-slate-50 active:bg-slate-100 h-[50px] w-full border flex justify-between items-center">
              Topics
              <div className="flex gap-2 items-center">
                <div className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border">
                  Post
                </div>
                <div className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border">
                  All
                </div>
                <div className="p-1 bg-white active:bg-slate-100 hover:bg-slate-100 select-none cursor-pointer px-2 rounded-xl text-[14px] border">
                  New challenge
                </div>
              </div>
            </div>
            {/* Analytics  */}
            <div className=" h-[calc(100%-270px)] w-full border overflow-hidden rounded-b-2xl">
              <div className="flex gap-2 h-[40px] border-b items-center">
                <div className="p-1 px-2 rounded-xl text-[14px]">Post</div>
                <div className="p-1 px-2 rounded-xl text-[14px]">States</div>
              </div>
              <div className="h-[calc(100%-40px)] p-1 w-full  overflow-auto">
                {/* post  */}
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>{" "}
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>{" "}
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>{" "}
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>post name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-[70%] pn:max-sm:w-full pn:max-sm:h-full sm:overflow-auto  space-y-2">
            <div className="h-full w-full relative bg-white overflow-hidden border rounded-2xl">
              <Card className="h-[calc(100%-100px)] w-full shadow-none  border-none">
                <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6"></div>
                  <div className="flex">
                    {["desktop", "mobile"].map((key) => {
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
                            {total[key as keyof typeof total].toLocaleString()}
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
      {click === 1 ? (
        <div className="w-full h-[calc(100%-60px)] pn:max-sm:flex-col  pn:max-sm:p-2 flex gap-2 ">
          <div className=" p-2 w-[30%] rounded-3xl pn:max-sm:h-full pn:max-sm:w-full border space-y-1 bg-white">
            <div className="flex gap-2 flex-col sm:h-[250px] w-full justify-between items-center">
              <div className="flex w-full h-full gap-2 items-center">
                {/* data 1 */}
                <div className="border w-full rounded-2xl h-[100%] space-y-2 flex justify-between flex-col p-2 bg-white">
                  <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                    <PiClipboardText className="text-green-600 text-[25px]" />
                  </div>
                  <div>
                    <div className="text-[#667085] font-semibold">Earnings</div>
                    <div className="text-[18px]">₹1,298</div>
                  </div>
                </div>
                {/* data 2 */}
                <div className="border w-full bg-white rounded-2xl space-y-2 flex justify-between flex-col h-[100%] p-2">
                  <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
                    <BsPeople className="text-purple-600 text-[25px]" />
                  </div>
                  <div>
                    <div className=" text-[#667085] font-semibold">
                      Customers
                    </div>
                    <div className="text-[20px]">298</div>
                  </div>
                </div>
              </div>
              {/* data 3 */}
              <div className="border w-full bg-white rounded-t-2xl space-y-2 flex justify-between flex-col h-[100%] p-2">
                <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
                  <FiShoppingBag className="text-blue-600 text-[25px]" />
                </div>
                <div className="flex bg-white gap-1 justify-between ">
                  <div className=" ">
                    <div className="text-[#667085] font-semibold">
                      All orders
                    </div>
                    <div className="text-center">0</div>
                  </div>
                  <div className=" ">
                    <div className="text-[#667085] font-semibold">Pending</div>
                    <div className="text-center">0</div>
                  </div>
                  <div className=" ">
                    <div className="text-[#667085] font-semibold">
                      Completed
                    </div>
                    <div className="text-center">0</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[calc(100%-255px)] w-full border rounded-b-2xl">
              <div className="flex h-[40px] border-b justify-between items-center">
                <div className="p-1 px-2 rounded-xl text-[14px]">Product</div>
                <div className="p-1 px-2 rounded-xl flex items-center text-blue-500 cursor-pointer select-none hover:text-blue-600 hover:text-[14px] duration-100 hover:underline font-semibold text-[12px]">
                  Track Orders <FaAnglesRight />
                </div>
              </div>
              <div className="h-[calc(100%-40px)] p-1 w-full  overflow-auto">
                {/* post  */}
                <div className="gap-2 w-full h-[50px] border-b flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] border"></div>
                    <div>product name</div>
                  </div>
                  <div className="text-[12px] p-1 px-2 rounded-full bg-[#2a9d9083] text-white">
                    41%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-[70%]  pn:max-sm:h-full  pn:max-sm:w-full sm:overflow-auto space-y-2">
            <div className="h-full w-full relative bg-white overflow-hidden border rounded-2xl">
              <Card className="h-[calc(100%-100px)] w-full shadow-none  border-none">
                <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6"></div>
                  <div className="flex">
                    {["desktop", "mobile"].map((key) => {
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
                            {total[key as keyof typeof total].toLocaleString()}
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
            </div>
          </div>
        </div>
      ) : null}
      {click === 2 ? (
        <div className="w-full h-[calc(100%-60px)]   pn:max-sm:overflow-auto pn:max-sm:p-2 flex flex-col gap-2 ">
          <div className="flex gap-2 pn:max-sm:flex-col w-full justify-between items-center">
            {/* <div className="flex w-full h-full gap-2 items-center"> */}
            {/* data 1 */}
            <div className="border w-full rounded-2xl h-[100%] space-y-2 flex gap-2 items-center p-2 bg-white">
              <div className="rounded-full bg-green-100 w-10 h-10 flex justify-center items-center">
                <PiClipboardText className="text-green-600 text-[25px]" />
              </div>
              <div>
                <div className="text-[#667085] font-semibold">Earnings</div>
                <div className="text-[18px]">₹1,298</div>
              </div>
            </div>
            {/* data 2 */}
            <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
              <div className="rounded-full bg-purple-100 w-10 h-10 flex justify-center items-center">
                <BsPeople className="text-purple-600 text-[25px]" />
              </div>
              <div>
                <div className=" text-[#667085] font-semibold">Customers</div>
                <div className="text-[20px]">298</div>
              </div>
            </div>
            {/* data 3 */}
            <div className="border w-full bg-white rounded-2xl space-y-2 flex gap-2 items-center h-[100%] p-2">
              <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center">
                <FiShoppingBag className="text-blue-600 text-[25px]" />
              </div>
              <div>
                <div className=" text-[#667085] font-semibold">Customers</div>
                <div className="text-[20px]">298</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2  pn:max-sm:flex-col w-full">
            <div className="h-full w-[70%]  pn:max-sm:w-full sm:overflow-auto space-y-2">
              <div className="h-full w-full relative bg-white p-2 border rounded-2xl">
                <Card className="h-full w-full shadow-none p-2 border-none">
                  <CardContent className="h-full w-full">
                    <ChartContainer
                      className="h-full w-full "
                      config={chartConfig}
                    >
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 20,
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                          dataKey="desktop"
                          type="natural"
                          stroke="var(--color-desktop)"
                          strokeWidth={2}
                          dot={{
                            fill: "var(--color-desktop)",
                          }}
                          activeDot={{
                            r: 6,
                          }}
                        >
                          <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                          />
                        </Line>
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className=" p-2 w-[30%] h-full rounded-3xl  pn:max-sm:w-full border bg-white">
              <div className=" w-full border rounded-3xl">
                <Card className="flex h-full flex-col shadow-none p-2 border-none rounded-3xl">
                  <CardContent className="flex h-full flex-1 items-center pb-0">
                    <ChartContainer
                      config={chartConfiges}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartDataes}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
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
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Visitors
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
