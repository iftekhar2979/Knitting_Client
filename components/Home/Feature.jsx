import { MdAssuredWorkload } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { LiaCertificateSolid } from "react-icons/lia";
const Feature = (props) => {
    return (
        <section className="my-16 px-16">
            <div className="flex flex-wrap">
                <div className="mb-6 w-full shrink-0 grow-0 basis-auto px-3 lg:mb-0 lg:w-4/12 fadeInLeftBig" >
                    <p className="mb-6 font-bold uppercase text-primary dark:text-primary-400">
                        Features
                    </p>
                    <h2 className="mb-6 text-3xl font-bold">
                        Why to Choose <u className="text-primary dark:text-primary-400">
                            Us ?</u>
                    </h2>

                    <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                        Choose us for our commitment to excellence, blending tradition with innovation in every knit.
                        Our eco-friendly practices, premium quality yarns, and state-of-the-art technology ensure superior fabric that stands the test of time, making us your ideal textile partner.
                    </p>
                </div>

                <div className="mb-md-0 mb-6 w-full shrink-0 grow-0 basis-auto px-3 lg:w-8/12" >
                    <div className="flex flex-wrap fadeInLeftBig">
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:px-3">
                            <div className="flex">
                                <div className="shrink-0">
                                    <div className="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                                       
                                        <MdAssuredWorkload color={"teal"}  size={30}/>
                                    </div>
                                </div>
                                <div className="ml-4 grow">
                                    <p className="mb-3 font-bold">Sustainable Practices</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Many knitting companies in Bangladesh are moving towards more sustainable and environmentally friendly production methods, including the use of organic materials and water-saving technologies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:px-3">
                            <div className="flex fadeInRight">
                                <div className="shrink-0">
                                    <div className="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                                    <GrTechnology color={"indigo"}  size={30}/>
                                    </div>
                                </div>
                                <div className="ml-4 grow">
                                    <p className="mb-3 font-bold">Advanced Technology </p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Adoption of the latest knitting technology allows for high efficiency, intricate designs, and customization capabilities, meeting diverse customer needs with precision.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:px-3 ">
                            <div className="flex fadeInRight">
                                <div className="shrink-0">
                                    <div className="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                                        <GiSkills color={"purple"}  size={30}/>
                                    </div>
                                </div>
                                <div className="ml-4 grow">
                                    <p className="mb-3 font-bold">Skilled Workforce</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Bangladesh&apos;s rich tradition in textiles has cultivated a highly skilled workforce adept in both traditional and modern knitting techniques, ensuring craftsmanship and quality.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:px-3 ">
                            <div className="flex fadeInRight">
                                <div className="shrink-0">
                                    <div className="mb-6 inline-block rounded-md bg-primary-100 p-4 text-primary">
                                        <LiaCertificateSolid color={"green"}  size={30}/>
                                    </div>
                                </div>
                                <div className="ml-4 grow">
                                    <p className="mb-3 font-bold">Global Compliance</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Complying with international labor and quality standards, these companies often hold certifications like ISO and Oeko-Tex, making them reliable partners in the global textile market.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Feature;