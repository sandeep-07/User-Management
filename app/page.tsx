import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Calendar, CircleStop, Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import { Mail } from "lucide-react";
import { Facebook } from "lucide-react";

const MainDashboard = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-10 gap-5 max-w-7xl mx-auto">
        <div>
          <FirstCard />
        </div>
        <div className="col-span-1 md:col-span-2">
          <SecondCard />
        </div>
        <ThirdCard />
        <FourthCard />
        <FifthCard />
      </div>
    </div>
  );
};

const FirstCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Robert Smith</CardTitle>
        <CardDescription>Product Designer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Mail />
          <Facebook />
          <Instagram />
          <Linkedin />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="px-4 py-2 border-2 rounded-2xl">Time Slots</div>
        <div className="px-4 py-2 border-2 rounded-2xl">Meetings</div>
      </CardFooter>
    </Card>
  );
};

const SecondCard = () => {
  const SubCard = ({
    title,
    date,
    progress,
    progressField,
    bgColor,
  }: {
    title: string;
    date: string;
    progress: number;
    progressField: string;
    bgColor: string;
  }) => {
    return (
      <div
        className={cn("w-full h-[200px]  p-4 rounded-lg shadow-md", bgColor)}
      >
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader>
            <CardDescription>{date}</CardDescription>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <span className="text-gray-500">{progressField}</span>
            <Progress value={progress} />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    );
  };
  return (
    <div className="flex gap-4">
      <SubCard
        progressField={"Prototyping"}
        progress={90}
        title="Web Designing"
        date="March 05,2024"
        bgColor="bg-yellow-200"
      />
      <SubCard
        progressField={"Design"}
        progress={50}
        title="Mobile App"
        date="March 05,2024"
        bgColor="bg-blue-200"
      />
      <SubCard
        progressField={"Wireframe"}
        progress={20}
        title="Dashboard"
        date="March 05,2024"
        bgColor="bg-red-200"
      />
    </div>
  );
};

const ThirdCard = () => {
  const ListBox = ({
    fieldName,
    value,
  }: {
    fieldName: string;
    value: string;
  }) => {
    return (
      <div className="text-xs my-2 border-2 px-1 py-2 rounded-lg gap-2 flex items-center">
        <div>
          {" "}
          <CircleStop />
        </div>
        <div>
          <div>{fieldName}</div>
          <div>{value}</div>
        </div>
      </div>
    );
  };
  return (
    <Card className="bg-green-200">
      <CardHeader>
        <CardTitle>Detailed Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ListBox fieldName="Full Name" value="Robert Smith" />
        <ListBox fieldName="Email" value="sandeep@google.com" />
        <ListBox fieldName="Phone" value="987678124" />
        <ListBox fieldName="Designation" value="Software Eng" />
      </CardContent>
    </Card>
  );
};

const FourthCard = () => {
  return (
    <Card className="bg-green-200">
      <CardHeader className="flex bg-green-200">
        Calendar <Calendar />{" "}
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
const FifthCard = () => {
  const ListBox = ({
    profilePic,
    position,
    text,
  }: {
    profilePic: string;
    position: string;
    text: string;
  }) => {
    return (
      <div className="text-xs my-2 border-2 px-1 py-2 rounded-lg gap-2 flex items-center">
        <div>
          <img src={profilePic} alt="profile" className=" rounded-full" />
        </div>
        <div>
          <div className="font-semibold">{position}</div>
          <div className="text-gray-700">{text}</div>
        </div>
      </div>
    );
  };
  return (
    <Card className="bg-green-200">
      <CardHeader className="flex">
        Inbox <Mail />{" "}
      </CardHeader>
      <CardContent>
        <ListBox
          profilePic="https://dummyjson.com/icon/emilys/128"
          position="Web Designing"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur id optio a quae repellat quas? Voluptas, iusto veritatis ullam"
        />
        <ListBox
          profilePic="https://dummyjson.com/icon/michaelw/128"
          position="Web Designing"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur id optio a quae repellat quas? Voluptas, iusto veritatis ullam"
        />
        <ListBox
          profilePic="https://dummyjson.com/icon/jamesd/128"
          position="Web Designing"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur id optio a quae repellat quas? Voluptas, iusto veritatis ullam"
        />
      </CardContent>
    </Card>
  );
};

export default MainDashboard;
