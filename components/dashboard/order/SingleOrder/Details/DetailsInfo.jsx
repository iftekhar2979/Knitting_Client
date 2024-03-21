import react from 'react';

const DetailsInfo = ({ data }) => {
    const { colour, style, yarnCount, yarnLot, yarnBrand, lycraLot, lycraBrand, lycraCount, polyStarCount, polyStarBrand, polyStarLot, sl, mc_DIA, f_GSM, e_DIA } = data
    return (
        <div>
            <h2 className="text-center text-3xl underline font-serif">Detailed Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 font-serif my-4">
                <div className=" shadow rounded-md  p-10">
                    <h2 className="py-2 px-4">Style : <span className="border-b py-2 px-4 font-extrabold">{style}</span></h2>
                    <h2 className="py-2 px-4">Colour : <span className="border-b py-2 px-4">{colour}</span></h2>
                    <h2 className="py-2 px-4">Stitch Length (mm) : <span className="border-b py-2 px-4">{sl}</span></h2>
                    <h2 className="py-2 px-4">Fabrics GSM : <span className="border-b py-2 px-4">{f_GSM}</span></h2> 
                </div>
                <div className=" shadow  rounded-md  p-10">
                    <h2 className="py-2 px-4">Yarn Count : <span className="border-b py-2 px-4 font-extrabold">{yarnCount}</span></h2>
                    <h2 className="py-2 px-4">Yarn Brand : <span className="border-b py-2 px-4">{yarnBrand}</span></h2>
                    <h2 className="py-2 px-4">Yarn Lot : <span className="border-b py-2 px-4">{yarnLot}</span></h2>
                </div>
                <div className=" shadow  rounded-md  p-10">
                    <h2 className="py-2 px-4">Lycra Count : <span className="border-b py-2 px-4 font-extrabold">{lycraCount}</span></h2>
                    <h2 className="py-2 px-4">Lycra Brand : <span className="border-b py-2 px-4">{lycraBrand}</span></h2>
                    <h2 className="py-2 px-4">Lycra Lot : <span className="border-b py-2 px-4">{lycraLot}</span></h2>
                </div>
                <div className=" shadow  rounded-md  p-10">
                    <h2 className="py-2 px-4">Poly Star Count : <span className="border-b py-2 px-4 font-extrabold">{polyStarCount}</span></h2>
                    <h2 className="py-2 px-4">Poly Star Brand : <span className="border-b py-2 px-4">{polyStarBrand}</span></h2>
                    <h2 className="py-2 px-4">Poly Star Lot : <span className="border-b py-2 px-4">{polyStarLot}</span></h2>
                </div>
                <div className=" shadow  rounded-md  p-10">
                    <h2 className="py-2 px-4">Mechine DIA : <span className="border-b py-2 px-4 font-extrabold">{mc_DIA}</span></h2>
                    <h2 className="py-2 px-4">E DIA : <span className="border-b py-2 px-4">{e_DIA}</span></h2>
                  
                </div>
            </div>
        </div>
    )
};
export default DetailsInfo;