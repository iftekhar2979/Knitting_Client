import Image from "next/image";
import { TiTick } from "react-icons/ti";
import yellow_maching from "@/assets/yellow_maching.png"
const Services = (props) => {
    return (
        <section class="mb-32 text-center lg:text-left">
            <div class="py-12 md:px-6 md:px-12">
                <div class="container mx-auto xl:px-32">
                    <div class="flex grid items-center lg:grid-cols-2">
                        <div class="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                            <div
                                class="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                                <h2 class="mb-6 text-3xl font-bold">Services</h2>
                                <p class="mb-8 text-neutral-500 dark:text-neutral-300">
                                    Discover our tailored knitting solutions, from custom designs to bulk production, ensuring quality, innovation, and personalized support at every step
                                </p>

                                <div class="grid gap-x-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Custom Design Service
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Pattern Development
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Yarn Sourcing
                                        </p>
                                    </div>
                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Sample Knitting
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Bulk Production
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Finishing Services
                                        </p>
                                    </div>
                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Packaging and Branding
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            Logistics Support
                                        </p>
                                    </div>

                                    <div class="mb-6">
                                        <p class="flex items-center">
                                            <TiTick color="green" size={40} />
                                            After-Sales Support
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:mb-12 lg:mb-0">
                          <Image src={yellow_maching} loading="lazy" alt="Knitting Machine"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Services;