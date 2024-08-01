"use client"

// import { PureComponent } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import { Bs4CircleFill, BsBuildingAdd, BsFillTriangleFill, BsShopWindow, BsTriangle, BsTriangleHalf } from "react-icons/bs";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaBuildingColumns, FaCartShopping, FaFirstOrder, FaPersonDress, FaProductHunt } from "react-icons/fa6";
import { GiDress, GiFactory, GiPokerHand } from "react-icons/gi";
import { MdArrowDownward } from "react-icons/md";
import { PieChart } from "./PieChart";

import SelectTime from "./components/SelectTime";
import OverviewContainer from "./components/OverviewContainer";
import PopularContainer from "./components/PopularContainer";
import PieChartCircle from "./PieChartCirle";


const Dashboard = (props) => {
    return ( 
        <section className="px-4  lg:flex lg:justify-around ">
            <div className=" w-full lg:w-[60%] m-2">


                <div className="flex items-center justify-between my-2">
                    <h2 className=" font-bold text-xl ">Overview</h2>
                    <SelectTime/>

                </div>
                <div className="shadow-sm p-6 border-rad-2 bg-white ">
                   <OverviewContainer/>

                    <h1 className=" font-bold text-xl text-center my-4">Most Popular</h1>
                    <hr />
                   <PopularContainer/>
                </div>
            </div>
            <div className="m-2">

                <PieChart />
                <PieChartCircle/>
            </div>
        </section>
    )
};
export default Dashboard;