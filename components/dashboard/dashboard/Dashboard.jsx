"use client"

import { BiSolidShoppingBag } from "react-icons/bi";
import { Bs4CircleFill, BsBuildingAdd, BsFillTriangleFill, BsShopWindow, BsTriangle, BsTriangleHalf } from "react-icons/bs";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaBuildingColumns, FaCartShopping, FaFirstOrder, FaPersonDress, FaProductHunt } from "react-icons/fa6";
import { GiDress, GiFactory, GiPokerHand } from "react-icons/gi";
import { MdArrowDownward } from "react-icons/md";

const Dashboard = (props) => {
    return (
        <section className="px-4">
            <div className="flex items-center justify-between my-6  w-[60%]">
                <h2 className=" font-bold text-xl ">Overview</h2>
                <div className="px-4 flex items-center text-sm" >
                    <span className="mx-2">All Time</span>
                    <BsFillTriangleFill className="text-inactive" style={{ transform: "rotate(180deg)" }} />
                </div>

            </div>
            <div className="shadow-sm p-6 border-rad-2 bg-white w-[60%] ">
                <div className="border p-6 flex justify-between  border-rad-2 bg-inactive">
                    <div className="border w-fit p-4 bg-white border-rad px-2 shadow-sm ">
                        <div className="flex items-center">

                            <GiFactory size={20} />
                            <h2 className=" text-black  text-md font-semibold px-2">Subscribed Company</h2>
                        </div>
                        <p className="font-semibold   text-2xl text-center">500</p>
                    </div>
                    <div className="border w-fit p-4 bg-white border-rad px-2 shadow-sm ">
                        <div className="flex items-center">
                            <GiDress size={20} />
                            <h2 className=" text-black text-md  font-semibold" >Fabrics Type</h2>
                        </div>
                        <p className="font-semibold text-2xl  text-center">18</p>
                    </div>
                    <div className="border w-fit p-4 bg-white border-rad px-2 shadow-sm ">
                        <div className="flex items-center">
                            <FaCartShopping size={20} />
                            <h2 className=" text-black  text-md px-2 font-semibold">Total Order</h2>
                        </div>
                        <p className="font-semibold  text-center text-2xl">1000</p>
                    </div>
                </div>

                <h1 className=" font-bold text-xl text-center my-4">Most Popular</h1>
                <hr />
                <div className="flex justify-around p-4 border-rad-2 my-4 bg-inactive">
                    <div className="bg-white border-rad p-4">
                        <h2 className=" font-bold text-xl py-2  "> Companies</h2>
                        <ol>
                            <li>
                                <div>
                                    <h2>Grapics Textile Ltd</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>Mahmud Fashion</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>The Abc Ltd</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>

                        </ol>
                    </div>
                    <div className="bg-white border-rad p-4">
                        <h2 className=" font-bold text-xl py-2  "> Buyer</h2>
                        <ol>
                            <li>
                                <div>
                                    <h2>GTL-1</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>MFL-Bestseller</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>TAL-1</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>

                        </ol>
                    </div>

                    <div className="bg-white border-rad p-4">
                        <h2 className=" font-bold text-xl py-2  "> Fabrics</h2>
                        <ol>
                            <li>
                                <div>
                                    <h2>Yarn</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>Polystar</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>
                            <li>
                                <div>
                                    <h2>Lycra</h2>
                                    <div className="flex justify-between">

                                        <BiSolidShoppingBag size={18} className="text-active" />
                                        <span className="text-sm text-active font-bold">02</span>
                                    </div>
                                </div>
                                <hr />

                            </li>

                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Dashboard;