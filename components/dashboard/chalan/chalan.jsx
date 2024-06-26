import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useAppSelector } from '@/lib/hooks';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({

  page: { fontFamily: "Times-Roman" },
  companyName: { fontFamily: "Times-Roman", textAlign: "center", fontSize: 35, marginTop: 5, fontWeight: 'bold' },
  section: { fontFamily: "Times-Roman", fontSize: 15, color: 'black', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 5 },
  descOfGoods: { textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginLeft: 6 },
  chalanHeading: { textAlign: 'center', backgroundColor: "gray", padding: 4, margin: 2 },
  fabricsHeading: { fontSize: 17, textAlign: 'center' },
  companyInfo: { fontStyle: "italic", fontSize: 12, textAlign: 'center' },
  parentChalanInfo: { flexDirection: 'row', marginTop: 15 },
  chalanInfo: { width: '60%', fontSize: 16, marginLeft: 30, display: 'flex', flexDirection: 'column' },
  childrenChalanInfo: { marginTop: 2 ,fontWeight:'bold'},
});

Font.register({
  family: 'Times-Roman',
  fontStyle: 'italic',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});
const Chalan = ({ id, data }) => {
  if (id) {
    const { createdAt, deliveredQuantity, deliveredBy, order,roleQuantity,vechileNumber } = data
    return (

      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.companyName}>Tertiary Colour Knit Fabrics</Text>
          <Text style={{ fontStyle: "italic", fontSize: 12, textAlign: 'center' }}>Near Rubel Pump,Rajabar,Konabari, Gazipur</Text>
          <Text style={{ fontStyle: "italic", fontSize: 12, textAlign: 'center' }}>100% Export Oriented Knit Fabrics Manufacture & Sufflier</Text>
          <Text style={{ fontStyle: "italic", fontSize: 12, textAlign: 'center' }}>Mobile : 01711-344139, 01716-019843 , Email:kamrul@tertiaryckf.com</Text>
          <View style={styles.section}>
            <Text style={styles.chalanHeading}>C</Text>
            <Text style={styles.chalanHeading}>H</Text>
            <Text style={styles.chalanHeading}>A</Text>
            <Text style={styles.chalanHeading}>L</Text>
            <Text style={styles.chalanHeading}>L</Text>
            <Text style={styles.chalanHeading}>A</Text>
            <Text style={styles.chalanHeading}>N</Text>
          </View>
          <Text style={{ fontStyle: "italic", fontSize: 17, textAlign: 'center' }}>( {order?.unit} Unit ) </Text>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <View style={{ width: '60%', fontSize: 14, marginLeft: 30, display: 'flex', flexDirection: 'column' }}>
              <Text style={styles.childrenChalanInfo}>Company Name : {order?.company?.companyName}</Text>
              <Text style={styles.childrenChalanInfo}>Address : {order?.company?.location}</Text>
              <Text style={styles.childrenChalanInfo}>Fabric Type : {order?.fabricsName}</Text>
              {order?.sbNumber ? <Text style={styles.childrenChalanInfo}>SB No : {order?.sbNumber}</Text> : ""}
              {order?.bookingNumber ? <Text style={styles.childrenChalanInfo}>Booking No : {order?.bookingNumber}</Text> : ""}
              {order?.jobNumber ? <Text style={styles.childrenChalanInfo}>Job No : {order?.jobNumber}</Text> : ""}
              {order?.programNumber ? <Text style={styles.childrenChalanInfo}>Program No : {order?.programNumber}</Text> : ""}

            </View>
            <View style={{ width: '30%', marginLeft: 40, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
              <Text style={{}}>Date : {format(createdAt, "PP")}</Text>
              <Text style={styles.childrenChalanInfo}>Challan No : {id}</Text>
              <Text style={styles.childrenChalanInfo}>Gate Pass No : </Text>
              <Text style={styles.childrenChalanInfo}>Buyer : {order?.buyerName}</Text>
              <Text style={styles.childrenChalanInfo}>Season : {order?.season}</Text>
              <Text style={styles.childrenChalanInfo}>Through By : {deliveredBy}</Text>
              <Text style={styles.childrenChalanInfo}>Vechile No : {vechileNumber}</Text>
              
            </View>
          </View>
          <View style={{display:'flex',flexDirection:'row',marginLeft:30,height:"51%",marginRight:30,marginTop:20,border:"1px solid black"}}>
            <View style={{ width: "6%", height: "100%", borderRight: "1px solid black" }}>

              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>SL.</Text>
              {/* <Text style={styles.descOfGoods}>1.</Text>
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
              {order?.details?.polyStarBrand ?<Text style={styles.descOfGoods}>12.</Text>
              {order?.details?.polyStarLot ?<Text style={styles.descOfGoods}>13.</Text>:""}
              {order?.details?.mc_DIA ?<Text style={styles.descOfGoods}>14.</Text>:""}
              {order?.details?.e_DIA ?<Text style={styles.descOfGoods}>15.</Text>:""} */}
            <Text style={{textAlign:'left',height:"5%",width:32,position:'absolute',top:400,fontSize:12,paddingTop:4,textAlign:'center',borderTop:"1px solid black"}}></Text>
            </View>
            <View style={{ width: "45%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, borderBottom: "1px solid black", paddingTop: 4 }}>Description of Goods</Text>
              {order?.details?.sl?<Text style={styles.descOfGoods}>Sl : {order?.details?.sl}</Text>:""}
              {order?.details?.style?<Text style={styles.descOfGoods}>Style : {order?.details?.style}</Text>:""}
              {order?.details?.colour?<Text style={styles.descOfGoods}>Color : {order?.details?.colour}</Text>:""}
              {order?.details?.f_GSM ?<Text style={styles.descOfGoods}>Fabrics Gsm : {order?.details?.f_GSM}</Text>:""}
              {order?.details?.yarnCount?<Text style={styles.descOfGoods}>Yarn Count : {order?.details?.yarnCount}</Text>:""}
              {order?.details?.yarnLot?<Text style={styles.descOfGoods}>Yarn Lot : {order?.details?.yarnLot}</Text>:""}
              {order?.details?.yarnBrand?<Text style={styles.descOfGoods}>Yarn Brand : {order?.details?.yarnBrand}</Text>:""}
              {order?.details?.lycraCount?<Text style={styles.descOfGoods}>Lycra Count : {order?.details?.lycraCount}</Text>:""}
             { order?.details?.lycraLot ?<Text style={styles.descOfGoods}>Lycra Lot : {order?.details?.lycraLot}</Text>: ""}
              {order?.details?.lycraBrand ? <Text style={styles.descOfGoods}>Lycra Brand : {order?.details?.lycraBrand}</Text> : ""}
              {order?.details?.polyStarCount ? <Text style={styles.descOfGoods}>Polyster Count : {order?.details?.polyStarCount}</Text> : ""}
              {order?.details?.polyStarBrand ? <Text style={styles.descOfGoods}>Polyster Brand : {order?.details?.polyStarBrand}</Text> : ""}
              {order?.details?.polyStarLot ? <Text style={styles.descOfGoods}>Polyster Lot : {order?.details?.polyStarLot}</Text> : ""}
              {order?.details?.mc_DIA ? <Text style={styles.descOfGoods}>M/C DIA : {order?.details?.mc_DIA}</Text> : ""}
              {order?.details?.e_DIA ? <Text style={styles.descOfGoods}>E DIA : {order?.details?.e_DIA}</Text> : ""}
              <Text style={{textAlign:'left',height:"5%",width:240,position:'absolute',paddingTop:7,top:400,fontSize:12,textAlign:'center',borderTop:"1px solid black"}}>Total</Text>
            </View>
            <View style={{ width: "7%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>Roll</Text>
              <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{roleQuantity ? roleQuantity :""} R </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,textAlign:'center',width:37,borderTop:"1px solid black"}}>{roleQuantity} R </Text>
            </View>
            <View style={{ width: "15%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>F/Weight (kg)</Text>
              <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{order?.unit==='Fabric' ? deliveredQuantity :""} </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,width:81,textAlign:'center',borderTop:"1px solid black"}}>{order?.unit==='Fabric' ? deliveredQuantity :""}</Text>
            </View>
            <View style={{ width: "15%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>G/Weight</Text>
              <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{order?.unit!=='Fabric' ? deliveredQuantity :""} </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,width:81,textAlign:'center',borderTop:"1px solid black"}}>{order?.unit!=='Fabric' ? deliveredQuantity :""} </Text>
            </View>
            <View style={{ width: "12%", height: "100%" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>Remark</Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,width:65,textAlign:'center',borderTop:"1px solid black"}}></Text>
            </View>
          </View>
          <Text style={{ marginLeft: 30, fontSize: 16 }}>Receive the above in good condition.</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ marginLeft: 30, fontSize: 13, width: 110, marginTop: 50, borderTop: '1px solid black' }}>Checked & Received</Text>
            <Text style={{ marginLeft: 30, fontSize: 13, width: 80, marginTop: 50, borderTop: '1px solid black' }}>Store Manager</Text>
            <Text style={{ marginLeft: 40, fontSize: 13, width: 100, marginTop: 50, borderTop: '1px solid black' }}>Factory Manager / Knitting Manager</Text>
            <Text style={{ marginLeft: 60, fontSize: 13, width: 120, marginTop: 50, borderTop: '1px solid black' }}>Authoresed Signature</Text>
          </View>
        </Page>
      </Document>
    );

  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.companyName}>Don&apos;t have data !!!</Text>

      </Page>
    </Document>
  );
}

export default Chalan