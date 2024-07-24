import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font,Image } from '@react-pdf/renderer';
import { useAppSelector } from '@/lib/hooks';
import { format } from 'date-fns';
import { companyInformation } from '@/contents/companyInformation';
import { Item } from '@radix-ui/react-menubar';
// import {logo} from "../../../public/assets/logo.jpg"
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
const ReturnChalan = ({ id,anotherInfo, data }) => {
  if (id) {
    const { createdAt, returnQuantity, deliveredBy, order,role,vechileNumber } = data
    return (

      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{display:"flex", justifyContent:"center"}}>
            <Image src="https://i.postimg.cc/FKc8pPqQ/tertiary.jpg" style={{width:"58px",height:"68px" ,paddingTop:"7px" }}/>
          <Text style={styles.companyName}>{companyInformation?.name}</Text>
          </View>
          <Text style={{ fontStyle: "italic", fontSize: 12, textAlign: 'center' }}>{companyInformation?.location}</Text>
          <Text style={{ fontStyle: "italic", fontSize: 12, textAlign: 'center' }}>{companyInformation?.intro}</Text>
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
          {/* <Text style={{ fontStyle: "italic", fontSize: 17, textAlign: 'center' }}>( {order?.unit} Unit ) </Text> */}
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <View style={{ width: '60%', fontSize: 14, marginLeft: 30, display: 'flex', flexDirection: 'column' }}>
              <Text style={styles.childrenChalanInfo}>Company Name : {anotherInfo?.company?.companyName}</Text>
              <Text style={styles.childrenChalanInfo}>Address : {anotherInfo?.company?.location}</Text>
              <Text style={styles.childrenChalanInfo}>Fabric Type : {anotherInfo?.yarnType}</Text>
            </View>
            <View style={{ width: '30%', marginLeft: 40, fontSize: 14, display: 'flex', flexDirection: 'column' }}>
              <Text style={{}}>Date : {format(createdAt, "PP")}</Text>
              <Text style={styles.childrenChalanInfo}>Challan No : {id}</Text>
              <Text style={styles.childrenChalanInfo}>Gate Pass No : </Text>
              {/* <Text style={styles.childrenChalanInfo}>Buyer : {order?.buyerName}</Text> */}
              {/* <Text style={styles.childrenChalanInfo}>Season : {order?.season}</Text> */}
              <Text style={styles.childrenChalanInfo}>Through By : {deliveredBy}</Text>
              <Text style={styles.childrenChalanInfo}>Vechile No : {vechileNumber}</Text>
              
            </View>
          </View>
          <View style={{display:'flex',flexDirection:'row',marginLeft:30,height:"51%",marginRight:30,marginTop:20,border:"1px solid black"}}>
            <View style={{ width: "6%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>SL.</Text>
            <Text style={{textAlign:'left',height:"5%",width:32,position:'absolute',top:400,fontSize:12,paddingTop:4,textAlign:'center',borderTop:"1px solid black"}}></Text>
            </View>
            <View style={{ width: "60%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, borderBottom: "1px solid black", paddingTop: 4 }}>Description of Yarn</Text>
              <Text style={{ textAlign: 'left',  fontSize: 12, padding: 10, }}>{anotherInfo?.descriptionOfYarn} </Text>
              <Text style={{textAlign:'left',height:"5%",width:"100%",position:'absolute',paddingTop:7,top:400,fontSize:12,textOverflow:"hidden",textAlign:'center',borderTop:"1px solid black"}}>Total</Text>
            </View>
            <View style={{ width: "10%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>Roll</Text>
              <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{role ? role :""} R </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,textAlign:'center',width:"100%",borderTop:"1px solid black"}}>{role} R </Text>
            </View>
            <View style={{ width: "33%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>Quantity</Text>
           <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{data?.returnQuantity} </Text>
           <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,width:"100%",textAlign:'center',borderTop:"1px solid black"}}></Text>
     
            </View>
            {/* <View style={{ width: "15%", height: "100%", borderRight: "1px solid black" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>G/Weight</Text>
              <Text style={{ textAlign: 'left', height: "5%", fontSize: 12, paddingTop: 4, marginTop: 200, textAlign: 'center' }}>{order?.unit!=='Fabric' ? deliveredQuantity :""} </Text>
              <Text style={{textAlign:'left',height:"5%",fontSize:12,position:'absolute',paddingTop:7,top:400,width:81,textAlign:'center',borderTop:"1px solid black"}}>{order?.unit!=='Fabric' ? deliveredQuantity :""} </Text>
            </View>
            <View style={{ width: "12%", height: "100%" }}>
              <Text style={{ textAlign: 'center', height: "5%", fontSize: 13, paddingTop: 4, borderBottom: "1px solid black" }}>Remark</Text>
             
            </View> */}
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

export default ReturnChalan