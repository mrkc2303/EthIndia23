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

import { useSession } from "next-auth/react";

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
    title: "Sales",
    metric: "$ 12,699",
    progress: 15.9,
    target: "$ 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 45,564",
    progress: 36.5,
    target: "$ 125,000",
    delta: "23.9%",
    deltaType: "increase",
  },
  {
    title: "Customers",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
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

export type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
};

export const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  average: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

export default function ClientDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const { sdk, connected, connecting, account } = useSDK();
  const { data: session } = useSession();

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

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
      <Title>Client Dashboard</Title>
      {/* <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text> */}

      <Grid numItemsMd={3} numItemsLg={5} className="mt-6 gap-6">
        <div className="flex">
          <img
            src={session?.user?.image}
            width={200}
            height={200}
            className="rounded-full"
            alt="Picture of the author"
          ></img>
        </div>
        
        <ProgressCircle
          value={72}
          radius={40}
          strokeWidth={10}
          tooltip="radius: 40, strokeWidth: 10"
        />
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
                      <Bold>Zurich</Bold>
                    </Text>
                    <Icon
                      variant="simple"
                      icon={ChevronDoubleRightIcon}
                      size="xs"
                      color="slate"
                    />
                    <Text className="truncate">
                      <Bold>Vienna</Bold>
                    </Text>
                  </Flex>
                  <Text color="indigo">
                    <Bold>On time</Bold>
                  </Text>
                </Flex>
                <ProgressBar color="indigo" value={61} className="mt-3" />
                <Flex justifyContent="between" className="mt-3">
                  <div>
                    <Title>10:40</Title>
                    <Text>Platform 2</Text>
                  </div>
                  <div>
                    <Text className="text-center">7H 50M</Text>
                  </div>
                  <div className="text-right">
                    <Title>18:30</Title>
                    <Text className="text-right">No Reservation</Text>
                  </div>
                </Flex>
              </Card>
              <Card className="max-w-md mx-auto">
                <Flex className="truncate" justifyContent="between">
                  <Flex className="truncate" justifyContent="start">
                    <Text>
                      <Bold>Vienna</Bold>
                    </Text>
                    <Icon
                      variant="simple"
                      icon={ChevronDoubleRightIcon}
                      size="xs"
                      color="slate"
                    />
                    <Text className="truncate">
                      <Bold>St. Anton am Arlberg </Bold>
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
                    <Title>13:30</Title>
                    <Text>Sched. 13:30</Text>
                  </div>
                  <div className="text-right">
                    <Title>19:40</Title>
                    <Text className="text-right">Sched. 18:55</Text>
                  </div>
                </Flex>
                <Callout
                  title="+45 minutes behind plan"
                  icon={ExclamationIcon}
                  color="rose"
                  className="mt-6"
                >
                  Due to maintenance work, we have a minor delay. If you need
                  assistance with your travels today please contact the info
                  hotline.
                </Callout>
              </Card>
              <Card className="max-w-md mx-auto">
                <Flex justifyContent="start">
                  <Text>
                    <Bold>Nightjet Direction Bregenz</Bold>
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
                      <Title> Performance History </Title>
                      <Icon
                        icon={InformationCircleIcon}
                        variant="simple"
                        tooltip="Shows sales performance per employee"
                      />
                    </Flex>
                  </div>
                  <div className="flex space-x-2">
                    <MultiSelect
                      className="max-w-full sm:max-w-xs"
                      onValueChange={setSelectedNames}
                      placeholder="Select Salespeople..."
                    >
                      {salesPeople.map((item) => (
                        <MultiSelectItem key={item.name} value={item.name}>
                          {item.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelect>
                    <Select
                      className="max-w-full sm:max-w-xs"
                      defaultValue="all"
                      onValueChange={setSelectedStatus}
                    >
                      <SelectItem value="all">All Performances</SelectItem>
                      <SelectItem value="overperforming">
                        Overperforming
                      </SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="underperforming">
                        Underperforming
                      </SelectItem>
                    </Select>
                  </div>
                  <Table className="mt-6">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Leads
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Sales ($)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Quota ($)
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Variance
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Region
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right">
                          Status
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {salesPeople
                        .filter((item) => isSalesPersonSelected(item))
                        .map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.leads}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.sales}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quota}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.variance}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.region}
                            </TableCell>
                            <TableCell className="text-right">
                              <BadgeDelta
                                deltaType={deltaTypes[item.status]}
                                size="xs"
                              >
                                {item.status}
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
                  <Link href='/dashboard/call/'>
                    <Button size="xs" variant="light" icon={ArrowNarrowRightIcon} iconPosition="right">
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
