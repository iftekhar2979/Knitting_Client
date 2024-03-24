import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useAppSelector } from '@/lib/hooks';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({

    page: { fontFamily:"Times-Roman" },
    companyName:{fontFamily:"Times-Roman",textAlign:"center",fontSize:35,marginTop:5,fontWeight:'bold'},
    section: {fontFamily:"Times-Roman",fontSize:15, color: 'black', textAlign: 'center',display:'flex',justifyContent:'center',flexDirection:'row', marginTop: 5 },
  descOfGoods:{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginLeft:6},
  chalanHeading:{textAlign:'center',backgroundColor:"gray",padding:4, margin:2 },
  fabricsHeading:{fontSize:17,textAlign:'center'},
  companyInfo:{fontStyle:"italic",fontSize:12,textAlign:'center'},
  parentChalanInfo:{flexDirection:'row', marginTop:15},
  chalanInfo:{width:'60%',fontSize:16,marginLeft:30,display:'flex',flexDirection:'column'},
  childrenChalanInfo:{marginTop:2 },
});

Font.register({
    family: 'Times-Roman',
    fontStyle:'italic',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
// Create Document Component
const Chalan = ({id,data}) => {
    if(id){
        const {createdAt,deliveredQuantity,deliveredBy,order:{invoiceNumber="",company:{companyName="",location=""},poNumber="",pmNumber="",buyerName="",season="",fabricsName="",details:{colour='',e_DIA='',mc_DIA="",lycraBrand="",lycraLot="",lycraCount="",polyStarCount="",polyStarBrand="",polyStarLot="",yarnCount="",yarnBrand="",yarnLot="",sl="",f_GSM="",style=""}}}=data
return (

        <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.companyName}>Tertiary Colour Knit Fabrics</Text>
           <Text style={{fontStyle:"italic",fontSize:12,textAlign:'center'}}>Near Rubel Pump,Rajabar,Konabari, Gazipur</Text>
             <Text style={{fontStyle:"italic",fontSize:12,textAlign:'center'}}>100% Export Oriented Knit Fabrics Manufacture & Sufflier</Text>
                   <Text style={{fontStyle:"italic",fontSize:12,textAlign:'center'}}>Mobile : 01711-344139, 01716-019843 , Email:kamrul@tertiaryckf.com</Text>
          <View style={styles.section}>
                   <Text style={styles.chalanHeading}>C</Text>
                <Text style={styles.chalanHeading}>H</Text>
                <Text style={styles.chalanHeading}>A</Text>
                <Text style={styles.chalanHeading}>L</Text>
                <Text style={styles.chalanHeading}>L</Text>
                <Text style={styles.chalanHeading}>A</Text>
                <Text style={styles.chalanHeading}>N</Text>
          </View>
           <Text style={{fontStyle:"italic",fontSize:17,textAlign:'center'}}>( Fabrics Unit )</Text>
     <View style={{flexDirection:'row', marginTop:15}}>
          <View style={{width:'60%',fontSize:14,marginLeft:30,display:'flex',flexDirection:'column'}}>
                <Text style={styles.childrenChalanInfo}>Company Name : {companyName}</Text>
                  <Text style={styles.childrenChalanInfo}>Address : {location}</Text>
                  <Text style={styles.childrenChalanInfo}>Fabrics Name : {fabricsName}</Text>
            <Text style={styles.childrenChalanInfo}>Invoice No : {invoiceNumber}</Text>
            <Text style={styles.childrenChalanInfo}>PO No : {poNumber}</Text>
             <Text style={styles.childrenChalanInfo}>PM No : {pmNumber}</Text>
            
              </View>
           <View style={{width:'30%',marginLeft:40,fontSize:14,display:'flex',flexDirection:'column'}}>
                <Text style={{}}>Date : {format(createdAt,"PP")}</Text>
             <Text style={styles.childrenChalanInfo}>Challan No : {id}</Text>
                  <Text style={styles.childrenChalanInfo}>Gate Pass No : </Text>
                 <Text style={styles.childrenChalanInfo}>Buyer : {buyerName}</Text>
                 <Text style={styles.childrenChalanInfo}>Season : {season}</Text>
             <Text style={styles.childrenChalanInfo}>Through By : {deliveredBy}</Text>
              </View>
       </View>
       <View style={{display:'flex',flexDirection:'row',marginLeft:30,height:"55%",marginRight:30,marginTop:20,border:"1px solid black"}}>
         <View style={{width:"6%",height:"100%",borderRight:"1px solid black"}}>
        
           <Text style={{textAlign:'center',height:"5%",fontSize:13,paddingTop:4,borderBottom:"1px solid black"}}>SL.</Text>
           <Text style={styles.descOfGoods}>1.</Text>
            <Text style={styles.descOfGoods}>2.</Text>
           <Text style={styles.descOfGoods}>3.</Text>
           <Text style={styles.descOfGoods}>4.</Text>
           <Text style={styles.descOfGoods}>5.</Text>
           <Text style={styles.descOfGoods}>6.</Text>
           <Text style={styles.descOfGoods}>7.</Text>
           <Text style={styles.descOfGoods}>8.</Text>
           <Text style={styles.descOfGoods}>9.</Text>
           <Text style={styles.descOfGoods}>10.</Text>
           <Text style={styles.descOfGoods}>11.</Text>
           <Text style={styles.descOfGoods}>12.</Text>
           <Text style={styles.descOfGoods}>13.</Text>
           <Text style={styles.descOfGoods}>14.</Text>
           <Text style={styles.descOfGoods}>15.</Text>
       <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginTop:67,textAlign:'center',borderTop:"1px solid black"}}></Text>
        </View> 
           <View style={{width:"45%",height:"100%",borderRight:"1px solid black"}}>
                          <Text style={{textAlign:'center',height:"5%",fontSize:13,borderBottom:"1px solid black",paddingTop:4}}>Description of Goods</Text>
                        <Text style={styles.descOfGoods}>Style : {style}</Text>
                         <Text style={styles.descOfGoods}>Color : {colour}</Text>
                           <Text style={styles.descOfGoods}>Fabrics Gsm : {f_GSM}</Text>
                           <Text style={styles.descOfGoods}>Stitch Length (mm) : {sl}</Text>
                         <Text style={styles.descOfGoods}>Yarn Count : {yarnCount}</Text>
                           <Text style={styles.descOfGoods}>Yarn Lot : {yarnLot}</Text>
                        <Text style={styles.descOfGoods}>Yarn Brand : {yarnBrand}</Text>
                         <Text style={styles.descOfGoods}>Lycra Count : {lycraCount}</Text>
                          <Text style={styles.descOfGoods}>Lycra Lot : {lycraLot}</Text> 
                          <Text style={styles.descOfGoods}>Lycra Brand : {lycraBrand}</Text>
                         <Text style={styles.descOfGoods}>PolyStar Count : {polyStarCount}</Text>
                        <Text style={styles.descOfGoods}>PolyStar Brand : {polyStarBrand}</Text>
                        <Text style={styles.descOfGoods}>PolyStar Lot : {polyStarLot}</Text>
                         <Text style={styles.descOfGoods}>M/C DIA : {mc_DIA}</Text>
                         <Text style={styles.descOfGoods}>E DIA : {e_DIA}</Text>
             <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:7,marginTop:67,textAlign:'center',borderTop:"1px solid black"}}>Total</Text>
             </View> 
           <View style={{width:"7%",height:"100%",borderRight:"1px solid black"}}>
              <Text style={{textAlign:'center',height:"5%",fontSize:13,paddingTop:4,borderBottom:"1px solid black"}}>Roll</Text>
             <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginTop:413,textAlign:'center',borderTop:"1px solid black"}}></Text>
           </View> 
           <View style={{width:"15%",height:"100%",borderRight:"1px solid black"}}>
              <Text style={{textAlign:'center',height:"5%",fontSize:13,paddingTop:4,borderBottom:"1px solid black"}}>F/Weight (kg)</Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginTop:200,textAlign:'center'}}>{deliveredQuantity} </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:7,marginTop:190,textAlign:'center',borderTop:"1px solid black"}}>{deliveredQuantity}</Text>
           </View> 
           <View style={{width:"15%",height:"100%",borderRight:"1px solid black"}}>
              <Text style={{textAlign:'center',height:"5%",fontSize:13,paddingTop:4,borderBottom:"1px solid black"}}>G/Weight</Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginTop:413,textAlign:'center',borderTop:"1px solid black"}}></Text>
           </View> 
           <View style={{width:"12%",height:"100%"}}>
              <Text style={{textAlign:'center',height:"5%",fontSize:13,paddingTop:4,borderBottom:"1px solid black"}}>Remark</Text>
                  <Text style={{textAlign:'left',height:"5%",fontSize:12,paddingTop:4,marginTop:413,textAlign:'center',borderTop:"1px solid black"}}></Text>
         </View> 
          </View>
          <Text style={{marginLeft:30,fontSize:16}}>Receive the above in good condition.</Text>
        <View style={{display:'flex',flexDirection:'row'}}>
          <Text style={{marginLeft:30,fontSize:13,width:110,marginTop:50,borderTop:'1px solid black'}}>Checked & Received</Text>
              <Text style={{marginLeft:30,fontSize:13,width:80,marginTop:50,borderTop:'1px solid black'}}>Store Manager</Text>
           <Text style={{marginLeft:40,fontSize:13,width:100,marginTop:50,borderTop:'1px solid black'}}>Factory Manager</Text>
          <Text style={{marginLeft:60,fontSize:13,width:120,marginTop:50,borderTop:'1px solid black'}}>Authoresed Signature</Text>
          </View>
        </Page>
      </Document>
    );

    }
return(
    <Document>
    <Page size="A4" style={styles.page}>
        <Text style={styles.companyName}>Don't have data !!!</Text>
      
    </Page>
  </Document>
);
}

export default Chalan