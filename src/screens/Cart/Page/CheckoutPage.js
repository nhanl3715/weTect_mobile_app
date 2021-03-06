import React, { useState,useEffect } from 'react'
import { View, 
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableNativeFeedback,
    FlatList,
    TextInput,
    Picker,
    Image, 
    StatusBar,
    ImageBackground,
    Alert} from 'react-native'
import { 
    Ionicons,
    Entypo,
    AntDesign,
    MaterialIcons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Button,Header } from 'react-native-elements';
import { 
    Badge,
 } from 'react-native-paper';
import axios from 'axios'

const ListItem = (props)=>{
    return(
        <View style={styles.productDetailItem}>
            <View style={{width:"70%", flexDirection:"row"}}>
                <View style={{width:"20%", justifyContent:"center", alignItems:"center"}}>
                    <Image source={{uri:props.item.image, width:50,height:50}} />
                </View>
                <View style={{width:"100%"}}>
                    <Text style={{padding:"10%", fontSize:15}}>{props.item.name}</Text>
                </View>
            </View>
            <View style={{width:"30%", flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"red"}}>x1  -  {props.item.price}</Text>
            </View>
        </View>
    )
}

export default function CheckoutPage({ navigation,route }) {
    const [modal,setModal] = React.useState(false)
    const [modalAddress,setModalAddress] = React.useState(false)

    const [provinces, setProvinces] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [ward, setWard] = React.useState([]);

    const [addressProvince, setAP] = React.useState("");
    const [addressDistrict, setAD] = React.useState("");
    const [addressWard, setAW] = React.useState("");
    const [addressHome, setAH] = React.useState("");

    const getProvince = ()=>{
        axios({
            method:"get",
            url:"https://thongtindoanhnghiep.co/api/city"
        }).then(res =>{
            setProvinces(res.data.LtsItem)
        }).catch(err=>console.log(err));
    };
    const getDistric = (id)=>{
        axios({
            method:"get",
            url:`https://thongtindoanhnghiep.co/api/city/${id}/district`
        }).then(res =>{
            setDistrict(res.data)
        }).catch(err=>console.log(err));
    }
    const getWard = (id)=>{
        axios({
            method:"get",
            url:`https://thongtindoanhnghiep.co/api/district/${id}/ward`
        }).then(res =>{
            setWard(res.data)
        }).catch(err=>console.log(err));
    }
    

    return (
        <View style={styles.container}>  
            <ImageBackground source={require("./../../../../public/background2.jpg")} style={styles.image}>
            <Modal isVisible={modal}>
                <View style={styles.modal}>
                    <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                        <Button
                            title="Đóng"
                            type="clear"
                            onPress={()=>{
                                setModal(!modal)
                            }}
                        />
                    </View>
                    <View style={{justifyContent:"center", alignItems:"center", marginTop:"5%"}}>
                        <Text style={{fontSize:17,}}>XÁC NHẬN ĐƠN HÀNG</Text>
                        <Text style={{padding:"2%",fontSize:15}}>Chào bạn, đây là hộp thư xác nhận thông tin đơn hàng của bạn</Text>
                    </View>

                    <View style={{padding:"2%"}}>
                        <Text style={{fontSize:15}}>Bạn có: <Badge style={{fontSize:15}}> 8 sản phẩm </Badge></Text>
                        <Text style={{fontSize:15}}>Tổng đơn giá: <Badge style={{fontSize:15}}> 280.000 vnđ </Badge></Text>
                    </View>

                    <View style={{padding:"2%"}}>
                        <Text style={{fontSize:15}}>Địa chỉ của bạn: 288 - Nguyễn văn linh - Cần thơ </Text>
                    </View>

                    <View style={{marginTop:"5%", borderTopWidth:0.5, padding:"2%"}}>
                        <Text style={{fontSize:15}}>Đơn vị vận chuyển: <Badge style={{fontSize:15, backgroundColor:"#1C6A1F"}}> Giao hàng nhanh </Badge></Text>
                        <Text style={{marginTop:"1%", color:"red"}}>Hiện tại chúng tôi chỉ có hình thức thanh toán trực tiếp khi nhận hàng</Text>
                    </View>

                    <View style={{justifyContent:"center", alignItems:"center", marginTop:"5%", flexDirection:"row"}}>
                        <Button
                            type="solid"
                            title="Giao đến địa chỉ này"
                            buttonStyle={{backgroundColor:"#FB3500", padding:20}}
                            onPress={()=>{
                                navigation.replace('CheckoutLoaderPage')
                            }}
                        />
                    </View>
                </View>
            </Modal>

            <Modal 
                isVisible={modalAddress}
                animationInTiming={100}  
                animationIn="slideInLeft"  
                animationOut="slideOutLeft"
            >
                <StatusBar backgroundColor="rgba(0, 0, 0, 1)" />
                <View style={styles.modal}>
                    <View style={{position:"absolute", bottom:"5%", right:"5%"}}>
                        <Button
                            title="Đóng"
                            type="clear"
                            onPress={()=>{
                                setModalAddress(!modalAddress)
                            }}
                        />
                    </View>
                    <View style={{justifyContent:"center", alignItems:"center", marginTop:"5%"}}>
                        <Text style={{fontSize:17,padding:"5%"}}>THÊM ĐỊA CHỈ GIAO HÀNG</Text>
                    </View>

                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <View style={{width:"30%"}}>
                                <Text style={{fontSize:17}}>Tỉnh/Thành: </Text>
                            </View>
                            <View style={{width:"70%"}}>
                                <Picker
                                    mode="dropdown"
                                    label="Thành phố"
                                    onValueChange={  (item) => {
                                        getDistric(item.ID)
                                        setAP(item.Title)
                                    }}>
                                        {addressProvince !="" ? (<Picker.Item style={{fontSize:11}} label={addressProvince} key={1111111} value={'tinh thanh'} />)
                                        
                                        : (<Picker.Item style={{fontSize:11}} label="Chọn tỉnh thành"  key={1111111} value={'tinh thanh'} />)}
                                        
                                        {
                                        provinces.map( (v)=>{
                                            return <Picker.Item style={{fontSize:11}} label={v.Title} key={v.ID} value={v} />
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <View style={{width:"30%"}}>
                                <Text style={{fontSize:17}}>Quận/Huyện: </Text>
                            </View>
                            <View style={{width:"70%"}}>
                                <Picker
                                    mode="dropdown"
                                    label="Quận huyện"
                                    onValueChange={(item) => {
                                        setAD(`${item.Title} - `)
                                        getWard(item.ID)
                                    }}>
                                        {addressDistrict !="" ? (<Picker.Item style={{fontSize:11}} label={addressDistrict} key={1111111} value={'tinh thanh'} />)
                                        
                                        : (<Picker.Item style={{fontSize:11}} label="Chọn quận huyện"  key={1111111} value={'tinh thanh'} />)}
                                        {
                                        district.map( (v)=>{
                                            return <Picker.Item style={{fontSize:11}} label={v.Title} key={v.ID} value={v} />
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <View style={{width:"30%"}}>
                                <Text style={{fontSize:17}}>Xã phường: </Text>
                            </View>
                            <View style={{width:"70%"}}>
                                <Picker
                                    mode="dropdown"
                                    label="Xã phường"
                                    onValueChange={(item) => {
                                        setAW(`${item.Title} - `)
                                    }}>
                                        {addressWard !="" ? (<Picker.Item style={{fontSize:11}} label={addressWard} key={1111111} value={'thi tran'} />)
                                        
                                        : (<Picker.Item style={{fontSize:11}} label="Chọn thị xã/ thị trấn"  key={1111111} value={'thi tran'} />)}
                                        {
                                        ward.map( (v)=>{
                                            return <Picker.Item style={{fontSize:11}} label={v.Title} key={v.ID} value={v} />
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection:"row", alignItems:'center', marginTop:"2%"}}>
                            <View style={{width:"30%"}}>
                                <Text style={{fontSize:17}}>Địa chỉ nhà: </Text>
                            </View>
                            <View style={{width:"70%"}}>
                                <TextInput style={{
                                    height:30,
                                    width:"100%",
                                    borderColor:"red",
                                    borderBottomWidth:1
                                }} 
                                multiline={true}
                                onChangeText={(value)=>{
                                    setAH(`${value} - `)
                                }} />
                            </View>
                        </View>

                    <View style={{padding:20, marginTop:"5%"}}>
                            <Text>{  } </Text>
                    </View>

                    <View style={{justifyContent:"center", alignItems:"center", marginTop:"5%", flexDirection:"row"}}>
                           <Button
                            type="outline"
                            title="Giao đến địa chỉ này"
                            buttonStyle={{backgroundColor:"#EFEFEF", padding:20}}

                            onPress={()=>{
                                setModalAddress(!modalAddress)
                            }}
                           />
                    </View>
                </View>
            </Modal>

            <Header
                leftComponent={
                    <TouchableNativeFeedback style={{padding:20}} onPress={()=>{
                        navigation.goBack()
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="white" />
                    </TouchableNativeFeedback>
                }
                containerStyle={{
                    backgroundColor:"transparent"
                }}
                centerComponent={{ text: 'THANH TOÁN', style: { color: '#fff', fontSize:17 } }}
                rightComponent={
                    <TouchableNativeFeedback style={{padding:20}} onPress={()=>{
                        navigation.navigate('TabHome')
                    }}>
                        <MaterialIcons name="home" size={24} color="white" />
                    </TouchableNativeFeedback>
                }
            />
            <SafeAreaView showsVerticalScrollIndicator={false}
                style={{flex:1}} >
                <TouchableNativeFeedback onPress={()=>alert("Địa chỉ")} style={{borderBottomWidth:.5,borderBottomColor:"#C4CCDF"}}>
                    <View style={styles.boxAddress}>

                        <View style={{flexDirection:"row",padding:"3%"}}>
                            <View style={{width:"10%"}}>
                                <Entypo name="address" size={20} color="black" />
                            </View>
                            <View style={{width:"70%"}}>
                                <Text style={{marginLeft:"3%"}}>{addressHome}{addressWard}{addressDistrict}{addressProvince}</Text>
                            </View>
                            <View style={{width:"20%"}}>
                                <Text style={{color:"#F54509"}}>Mặc định</Text>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                
                <TouchableNativeFeedback onPress={()=>{
                    setModalAddress(true);
                    getProvince();
                }}>
                    <View style={{backgroundColor:"white", justifyContent:"center",}}>
                        <Text style={{color:"#256DB5",padding:"2%",borderBottomWidth:5,
                        borderColor:"#F3F2EE",}}>Thêm địa chỉ mới</Text>
                    </View>
                </TouchableNativeFeedback>
                
                <View style={styles.boxProductDetail}>
                    <View style={{
                        backgroundColor:"white",
                        flex:1, 
                        width:"100%", 
                        justifyContent:"center"}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={route.params.data}
                            renderItem={({item,index})=>{
                                return(
                                    <ListItem item={item} index={index} />
                                )
                            }}
                            keyExtractor = {item=>`${item.id}`}
                        />
                    </View>
                    <View style={styles.boxTotal}>
                        <TouchableNativeFeedback>
                            <View style={{flexDirection:"row",padding:"2%",backgroundColor:"#EBEEEC"}}>
                                <View style={{width:"60%"}}><Text style={{ color:"#165E2E"}}>Chọn đơn vị vận chuyển</Text></View>
                                <View style={{width:"30%"}}><Text>Giao hàng nhanh</Text></View>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center", }}>
                            <View style={{width:"50%",justifyContent:"center", alignItems:"center"}}>
                                <Text>San pham: 250.000</Text>
                                <Text >van chuyen: 30.000</Text>
                            </View>
                            <TouchableNativeFeedback onPress={()=>{
                                if(addressHome == ""){
                                    Alert.alert(
                                        "Thông báo",
                                        "Vui lòng kiểm tra lại địa chỉ giao hàng",
                                        [
                                          { text: "Đã rõ", onPress: () => {} }
                                        ],
                                        { cancelable: false }
                                      );
                                    return false
                                }
                                setModal(true)
                            }}>
                                <View style={{width:"50%", backgroundColor:"#FF8718",padding:"3%",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{color:"white"}}>THANH TOÁN</Text>
                                    <Text>280.000</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </SafeAreaView>   
            </ImageBackground>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:"relative",
        backgroundColor:'#48BE6F'
    },
    header:{
        flex:0.1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    iconBack:{
        position:"absolute",
        left:"5%"
    },
    image:{
        flex:1, 
        resizeMode:"cover"
    },
    boxAddress:{
        width:"100%",
        backgroundColor:"white",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    boxProductDetail:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    boxStatusAddress:{
        flexDirection:"row",
    },
    boxTotal:{
        backgroundColor:"white",
    },
    productDetailItem:{
        paddingLeft:"5%",
        flexDirection:"row",
        padding:"2%",
        borderBottomWidth:.5,
        borderBottomColor:"#D5D5D5",
    },
    boxModal:{
        width:"100%",
        height:"100%",
        position:"absolute",
        zIndex:9,
        justifyContent:"center",
        alignItems:"center"
    },
    modal:{
        backgroundColor:"white",
        width:"100%",
        padding:"5%",
        flex:1,
        justifyContent:"center",
    },
    fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue"
      },
      fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10
      },
      buttonRow: {
        flexDirection: "row",
        marginVertical: 16
      }
 
})