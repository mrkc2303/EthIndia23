"use client";

import { InformationCircleIcon } from "@heroicons/react/solid";
import { useSDK } from "@metamask/sdk-react";
import Image from "react";

import {
  AreaChart,
  BadgeDelta,
  Card,
  Color,
  DeltaType,
  Flex,
  Grid,
  Icon,
  Metric,
  MultiSelect,
  MultiSelectItem,
  ProgressBar,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
  Callout,
  CategoryBar,
  Bold,
  List,
  ListItem,
  ProgressCircle,
  Button,
} from "@tremor/react";

import {
  ChevronDoubleRightIcon,
  ExclamationIcon,
  MoonIcon,
  UserIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CashIcon,
  UsersIcon,
  ShoppingCartIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

import { useSession, signIn, signOut } from "next-auth/react";

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: "Earnings",
    metric: "ETH 1.3",
    progress: 32.5,
    target: "ETH 4",
    delta: "32.5%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Gigs",
    metric: "17",
    progress: 57,
    target: "30",
    delta: "57%",
    deltaType: "increase",
  },
  {
    title: "No of Hours",
    metric: "175",
    progress: 21.8,
    target: "800",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
];

const categories = [
  {
    title: "Project 1",
    wallet: "0x0319DD450C946d90d912A45c86C84F62BAb04306",
    text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
    icon: ShoppingBagIcon,
  },
  {
    title: "Project 2",
    wallet: "0x0319DD450C946d90d912A45c86C84F62BAb04306",
    text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
    icon: CashIcon,
  },
  {
    title: "Project 3",
    wallet: "0x0319DD450C946d90d912A45c86C84F62BAb04306",
    text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
    icon: UsersIcon,
  },
  {
    title: "Project 4",
    wallet: "0x0319DD450C946d90d912A45c86C84F62BAb04306",
    text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,
    icon: ShoppingCartIcon,
  },
];

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("us", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString();

const formatters: { [key: string]: any } = {
  Sales: (number: number) => `$ ${usNumberformatter(number)}`,
  Profit: (number: number) => `$ ${usNumberformatter(number)}`,
  Customers: (number: number) => `${usNumberformatter(number)}`,
  Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
};

const Kpis = {
  Sales: "Sales",
  Profit: "Profit",
  Customers: "Customers",
};

const kpiList = [Kpis.Sales, Kpis.Profit, Kpis.Customers];

export type DailyPerformance = {
  date: string;
  Sales: number;
  Profit: number;
  Customers: number;
};

export const performance: DailyPerformance[] = [
  {
    date: "2023-05-01",
    Sales: 900.73,
    Profit: 173,
    Customers: 73,
  },
  {
    date: "2023-05-02",
    Sales: 1000.74,
    Profit: 174.6,
    Customers: 74,
  },
  {
    date: "2023-05-03",
    Sales: 1100.93,
    Profit: 293.1,
    Customers: 293,
  },
  {
    date: "2023-05-04",
    Sales: 1200.9,
    Profit: 290.2,
    Customers: 29,
  },
];

export type project = {
  name: string;
  milestones: number;
  cost: number;
  time: string;
  progress: string;
};

export const projectValues: project[] = [
  {
    name: "Project 1",
    milestones: 6,
    cost: 0.2,
    time: "30 days",
    progress: "85%",
  },
  {
    name: "Project 2",
    milestones: 8,
    cost: 0.5,
    time: "37 days",
    progress: "55%",
  },
  {
    name: "Project 3",
    milestones: 3,
    cost: 0.25,
    time: "89 days",
    progress: "100%",
  },
  {
    name: "Project 4",
    milestones: 4,
    cost: 0.22,
    time: "65 days",
    progress: "35%",
  },
  {
    name: "Project 5",
    milestones: 10,
    cost: 0.8,
    time: "90 days",
    progress: "25%",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

export default function FreelanceDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const { sdk, connected, connecting, account } = useSDK();
  const { data: session } = useSession();

  const isSalesPersonSelected = (projectValues: project) =>
    (projectValues.progress === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(projectValues.name) || selectedNames.length === 0);

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: performance,
    index: "date",
    categories: [selectedKpi],
    colors: ["blue"] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 60,
  };
  if (!session) return <div />;

  async function fetcher(...arg: any[]) {
    const res = await fetch(...arg);

    return res.json();
  }

  const { data } = useSWR("/api/github", fetcher);

  console.log(data);

  // const handleClick = (path: string) => {
  //   if (path === "/dashboard/") {
  //     console.log("I clicked ondashboar the About Page");
  //   }
  // };

  return (
    <main className="mt-10 mx-5">
      <Title>Freelancer Dashboard</Title>
      {/* <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text> */}

      <Grid numItemsMd={3} numItemsLg={5} className="mt-6 gap-6">
        <div>
          <img
            src={session?.user?.image}
            width={200}
            height={200}
            className="rounded-full"
            alt="Picture of the author"
          ></img>
          <button
            onClick={() => {
              signOut();
            }}
            rel="noopener noreferrer"
            className="text-[#fff] font-primary font-bold text-xs md:text-sm py-3"
          >
            Remove your GitHub Account
          </button>
        </div>
        <ProgressCircle
          value={72}
          radius={40}
          strokeWidth={10}
          // tooltip="radius: 40, strokeWidth: 10"
        >75</ProgressCircle>
        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Followers</Text>
          <Metric>{data?.followers}</Metric>
        </Card>
        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Starred</Text>
          <Metric>{data?.starred}</Metric>
        </Card>
        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>Stars</Text>
          <Metric>{data?.stars}</Metric>
        </Card>
      </Grid>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
          <Tab>Clients</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              {kpiData.map((item) => (
                <Card key={item.title}>
                  <Flex alignItems="start">
                    <div className="truncate">
                      <Text>{item.title}</Text>
                      <Metric className="truncate">{item.metric}</Metric>
                    </div>
                    <BadgeDelta deltaType={item.deltaType}>
                      {item.delta}
                    </BadgeDelta>
                  </Flex>
                  <Flex className="mt-4 space-x-2">
                    <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                    <Text className="truncate">{item.target}</Text>
                  </Flex>
                  <ProgressBar value={item.progress} className="mt-2" />
                </Card>
              ))}
            </Grid>
            {/* <div className="mt-6">
              <Card>
                <>
                  <div className="md:flex justify-between">
                    <div>
                      <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                        <Title> Performance History </Title>
                        <Icon
                          icon={InformationCircleIcon}
                          variant="simple"
                          tooltip="Shows daily increase or decrease of particular domain"
                        />
                      </Flex>
                      <Text> Daily change per domain </Text>
                    </div>
                    <div>
                      <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                        <TabList color="gray" variant="solid">
                          <Tab>Sales</Tab>
                          <Tab>Profit</Tab>
                          <Tab>Customers</Tab>
                        </TabList>
                      </TabGroup>
                    </div>
                  </div>

                  <div className="mt-8 hidden sm:block">
                    <AreaChart {...areaChartArgs} />
                  </div>

                  <div className="mt-8 sm:hidden">
                    <AreaChart
                      {...areaChartArgs}
                      startEndOnly={true}
                      showGradient={false}
                      showYAxis={false}
                    />
                  </div>
                </>
              </Card>
            </div> */}

            <Grid numItemsSm={2} numItemsLg={3} className="gap-4 mt-10">
              <Card className="max-w-md mx-auto">
                <Flex className="truncate" justifyContent="between">
                  <Flex className="truncate" justifyContent="start">
                    <Text>
                      <Bold>Project 4</Bold>
                    </Text>
                    
                  </Flex>
                  <Text color="indigo">
                    <Bold>On time</Bold>
                  </Text>
                </Flex>
                <ProgressBar color="indigo" value={61} className="mt-3" />
                <Flex justifyContent="between" className="mt-3">
                  <div>
                    <Title>4 Dec</Title>
                    <Text>Milestone 2</Text>
                  </div>
                  <div>
                    <Text className="text-center">14 Days</Text>
                  </div>
                  <div className="text-right">
                    <Title>18 Dec</Title>
                    <Text className="text-right">Milestone 3</Text>
                  </div>
                </Flex>
              </Card>
              <Card className="max-w-md mx-auto">
                <Flex className="truncate" justifyContent="between">
                  <Flex className="truncate" justifyContent="start">
                    <Text>
                      <Bold>Project 2</Bold>
                    </Text>
                    
                  </Flex>
                  <Text color="rose">
                    <Bold>Delayed</Bold>
                  </Text>
                </Flex>
                <ProgressBar
                  value={65}
                  showAnimation={true}
                  color="rose"
                  className="mt-3"
                />
                <Flex justifyContent="between" className="mt-3">
                  <div>
                    <Title>6 Dec</Title>
                    <Text>Milestone 1</Text>
                  </div>
                  <div className="text-right">
                    <Title>9 Dec</Title>
                    <Text className="text-right">Milestone 2</Text>
                  </div>
                </Flex>
                <Callout
                  title="+1 day behind plan"
                  icon={ExclamationIcon}
                  color="rose"
                  className="mt-6"
                >
                  Due to issue in SDK, we have a minor delay.
                </Callout>
              </Card>
              <Card className="max-w-md mx-auto">
                <Flex justifyContent="start">
                  <Text>
                    <Bold>Project 5</Bold>
                  </Text>
                  <Icon
                    variant="simple"
                    icon={MoonIcon}
                    size="xs"
                    color="slate"
                  />
                </Flex>
                <Flex justifyContent="between" className="mt-3 space-x-3">
                  <Title>22:55</Title>
                  <div className="w-full">
                    <CategoryBar
                      values={[75, 15, 10]}
                      markerValue={75}
                      colors={["yellow", "gray", "gray"]}
                      showLabels={false}
                    />
                  </div>
                  <Title>10:22</Title>
                </Flex>
                <Flex className="mt-3">
                  <div>
                    <Flex
                      alignItems="baseline"
                      justifyContent="start"
                      className="space-x-2"
                    >
                      <Flex justifyContent="start" alignItems="baseline">
                        <Text>1st</Text>
                        <Icon
                          variant="simple"
                          icon={UserIcon}
                          size="xs"
                          color="slate"
                        />
                      </Flex>
                      <Flex justifyContent="start" alignItems="baseline">
                        <Text>2nd</Text>
                        <Icon
                          variant="simple"
                          icon={UserGroupIcon}
                          size="xs"
                          color="slate"
                        />
                      </Flex>
                    </Flex>
                  </div>
                  <Text>11H 22M</Text>
                </Flex>
                <List className="mt-4">
                  <ListItem>
                    <div>
                      <Text>
                        <Bold>22:55</Bold> Vienna{" "}
                      </Text>
                      <Text>
                        <Bold>07:49</Bold> Feldkirch{" "}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-right">
                        <Bold>Pl. 1</Bold>{" "}
                      </Text>
                      <Text className="text-right">
                        <Bold>Pl. 9</Bold>{" "}
                      </Text>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div>
                      <Text>
                        <Bold>08:05</Bold> Feldkirch{" "}
                      </Text>
                      <Text>
                        <Bold>08:28</Bold> Buchs SG{" "}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-right">
                        <Bold>Pl. 7</Bold>{" "}
                      </Text>
                      <Text className="text-right">
                        <Bold>Pl. 3</Bold>{" "}
                      </Text>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div>
                      <Text>
                        <Bold>08:30</Bold> Buchs SG{" "}
                      </Text>
                      <Text>
                        <Bold>10:22</Bold> Zurich HB{" "}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-right">
                        <Bold>Pl. 5</Bold>{" "}
                      </Text>
                      <Text className="text-right">
                        <Bold>Pl. 6</Bold>{" "}
                      </Text>
                    </div>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <>
                  <div>
                    <Flex
                      className="space-x-0.5"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Title> Project History </Title>
                      <Icon
                        icon={InformationCircleIcon}
                        variant="simple"
                        tooltip="Shows project history for a freelancer"
                      />
                    </Flex>
                  </div>
                  
                  <Table className="mt-6">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Milestones
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Earnings (ETH)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Timelines
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Progress
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {projectValues
                        .filter((item) => isSalesPersonSelected(item))
                        .map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.milestones}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.cost}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.time}
                            </TableCell>
                            <TableCell className="text-right">
                              <BadgeDelta
                                deltaType={deltaTypes[item.progress]}
                                size="xs"
                              >
                                {item.progress}
                              </BadgeDelta>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <Grid numItemsMd={2} numItemsSm={1} className="gap-6">
              {categories.map((item) => (
                <Card key={item.title}>
                  {/* <Icon variant="light" icon={item.icon} size="lg" color="blue" /> */}
                  <Title className="mt-6">{item.title}</Title>
                  <Text className="mt-2 outline-gray-500">{item.wallet}</Text>
                  <Text className="mt-2">{item.text}</Text>
                  <Flex className="mt-6 pt-4 border-t">
                    {/* <Link href={{pathname:"/dashboard/call" + item.wallet}}> */}
                    <Link href="/dashboard/call">
                      <Button
                        size="xs"
                        variant="light"
                        icon={ArrowNarrowRightIcon}
                        iconPosition="right"
                      >
                        Schedule a Talk
                      </Button>
                    </Link>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
