import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Text, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Photo from "./Photo";
import Advert from "./Advert";

const firebaseConfig = {
    apiKey: "AIzaSyBz1NwWgjC9U4CU7nRcWtwVp6aBkOIhN_Q",
    authDomain: "malgre-business.firebaseapp.com",
    projectId: "malgre-business",
    storageBucket: "malgre-business.appspot.com",
    messagingSenderId: "9807951283",
    appId: "1:9807951283:web:b841f4d997e169da6e87c6",
    measurementId: "G-3JJFPCV0H6"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Product = ({ route }) => {
    const [id, setId] = useState('');
    const [list, setList] = useState([]);
    const [supplier, setSupplier] = useState(''); //supplier id is here
    const [name, setName] = useState(''); //Supplier name
    const [surname, setSurname] = useState(''); //Supplier surname
    const [title, setTitle] = useState(''); //Name of product
    const [price, setPrice] = useState(0); //Price of product
    const [saleprice, setSalePrice] = useState(0); //SalePrice of product
    const [image, setImage] = useState(''); //Image of product
    const [count, setCount] = useState(0);
    const [top, setTop] = useState([]); //Size top of product
    const [bottom, setBottom] = useState([]); //Size bottom of product
    const [bra, setBra] = useState([]); //Size bra of product
    const [cup, setCup] = useState([]); //Size cup of product

    const product = {
        top: '',
        bottom: '',
        bra: '',
        cup: '',
    }

    var quantity = 0;
    function updateQuantity(newCount) 
    {
        setCount(newCount);
        quantity = count;
    }

    quantity = count;

    useEffect(() => {
        const fetchProduct = async() => {
            const userid = await SecureStore.getItemAsync('user');
            setId(userid);
            const q = query(collection(db, "Items"), where("name", "==", route.params.name), where("status", "==", "Approved"), where("quantity", ">=", 1));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                const productList = [];
                querySnapShot.forEach((doc) => {
                    productList.push(doc.data());
                    setTitle(doc.data().name);
                    setPrice(doc.data().price);
                    setSalePrice(doc.data().saleprice);
                    setSupplier(doc.data().supplier);
                });
                setList(productList);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const topS = list
            .map(item => item.top)
            .sort(function(a, b){return a-b});    
        const uniqueTop = [...new Set(topS)];
        setTop(uniqueTop);
        //Above is the top size array

        const bottomS = list
            .map(item => item.bottom)
            .sort(function(a, b){return a-b});
        const uniqueBottom = [...new Set(bottomS)];
        setBottom(uniqueBottom);
        //Above is the bottom size array

        const braS = list
            .map(item => item.bra)
            .sort(function(a, b){return a-b});
        const uniqueBra = [...new Set(braS)];
        setBra(uniqueBra);
        //Above is the bra size array

        const cupS = list
            .map(item => item.cup)
            .sort(function(a, b){return a-b});
        const uniqueCup = [...new Set(cupS)];
        setCup(uniqueCup);
        //Above is the cup size array

        async function addData(title, price, id, supplier) 
        {
            try {
                const docRef = await addDoc(collection(db, 'History'),
                {
                    name: title,
                    price: price,
                    user: id,
                    supplier: supplier
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }    
        }

        addData(title, price, id, supplier);

    }, [list]);

    useEffect(() => {
        const fetchName = async() => {
            const p = query(collection(db, "Designer"), where("supplier", "==", supplier));
            const pSnapShot = await getDocs(p);
            if(pSnapShot.empty)
            {
                //
            }
            else
            {
                pSnapShot.forEach((doc) => {
                    setName(doc.data().name);
                    setSurname(doc.data().surname);
                });
            }
        };

        fetchName();
    }, [supplier]);

    async function addData(title, price, top, bottom, bra, cup, quantity, id, supplier) 
    {
        try {
            const docRef = await addDoc(collection(db, 'Cart'),
            {
                name: title,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                user: id,
                supplier: supplier
            });
            alert('Item has been added to cart!');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    const Size = ({ top, bottom, bra, cup, list, product }) => {
        const [st, setT] = useState('');
        const [sb, setB] = useState('');
        const [sbr, setBr] = useState('');
        const [sc, setC] = useState('');
    
        if(top[0] != "" && bottom[0] == "" && cup[0] == "") //This is for buying shirts or tops
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Top Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {top.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setT(item), product.top = item}}
                                style = {[styles.buttonS, st === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, st === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                </View>
            )
        }
        else if(top[0] == "" && bottom[0] != "" && cup[0] == "") //This is for buying pants
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Bottom Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bottom.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setB(item), product.bottom = item}}
                                style = {[styles.buttonS, sb === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sb === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                </View>
            )
        }
        else if(top[0] != "" && bottom[0] != "" && cup[0] == "") //This is for buying dresses
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Top Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {top.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setT(item), product.top = item}}
                                style = {[styles.buttonS, st === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, st === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <Text style = {styles.chartS}>Bottom Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bottom.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setB(item), product.bottom = item}}
                                style = {[styles.buttonS, sb === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sb === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.descriptionS}>
                            Available size combinations:
                        </Text>
                        <Text style = {styles.descriptionS}>(Top Size - Bottom Size)</Text>
                        {list.map((item) => (
                            <Text style = {styles.combinationS}>
                                ({item.top} - {item.bottom}) 
                            </Text>
                        ))}
                    </View>
                </View>
            )
        }
        else if(top[0] != "" && bottom[0] == "" && cup[0] != "") //This is for buying dresses
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Top Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {top.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setT(item), product.top = item}}
                                style = {[styles.buttonS, st === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, st === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <Text style = {styles.chartS}>Bra Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bra.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setBr(item), product.bra = item}}
                                style = {[styles.buttonS, sbr === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sbr === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {cup.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setC(item), product.cup = item}}
                                style = {[styles.buttonS, sc === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sc === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.descriptionS}>
                            Available size combinations:
                        </Text>
                        <Text style = {styles.descriptionS}>(Top Size - Bra Size)</Text>
                        {list.map((item) => (
                            <Text style = {styles.combinationS}>
                                ({item.top} - {item.bra}{item.cup}) 
                            </Text>
                        ))}
                    </View>
                </View>
            )
        }
        else if(top[0] == "" && bottom[0] != "" && cup[0] != "") //This is for buying dresses
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Top Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bottom.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setB(item), product.bottom = item}}
                                style = {[styles.buttonS, sb === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sb === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <Text style = {styles.chartS}>Bra Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bra.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setBr(item), product.bra = item}}
                                style = {[styles.buttonS, sbr === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sbr === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {cup.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setC(item), product.cup = item}}
                                style = {[styles.buttonS, sc === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sc === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.descriptionS}>
                            Available size combinations:
                        </Text>
                        <Text style = {styles.descriptionS}>(Top Size - Bra Size)</Text>
                        {list.map((item) => (
                            <Text style = {styles.combinationS}>
                                ({item.top} - {item.bra}{item.cup}) 
                            </Text>
                        ))}
                    </View>
                </View>
            )
        }
        else if(top[0] != "" && bottom[0] != "" && cup[0] != "") //This is for buying underwear sets
        {
            return(
                <View style = {{ flex: 1 }}>
                    <Text style = {styles.chartS}>Top Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {top.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setT(item), product.top = item}}
                                style = {[styles.buttonS, st === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, st === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <Text style = {styles.chartS}>Bra Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bra.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setBr(item), product.bra = item}}
                                style = {[styles.buttonS, sbr === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sbr === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {cup.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setC(item), product.cup = item}}
                                style = {[styles.buttonS, sc === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sc === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <Text style = {styles.chartS}>Bottom Size Chart:</Text>
                    <ScrollView style = {styles.scrollS}
                        horizontal = {true}
                        showsHorizontalScrollIndicator={false}>
                        {bottom.map((item, key) => (
                            <TouchableOpacity 
                                key = {key}
                                onPress = { () => {setB(item), product.bottom = item}}
                                style = {[styles.buttonS, sb === item && styles.selectedS,]}>
                                <Text style = {[styles.buttonLabelS, sb === item && styles.selectedLabelS,]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <Text></Text>
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.descriptionS}>
                            Available size combinations:
                        </Text>
                        <Text style = {styles.descriptionS}>(Top Size - Bra Size - Bottom Size)</Text>
                        {list.map((item) => (
                            <Text style = {styles.combinationS}>
                                ({item.top} - {item.bra}{item.cup} - {item.bottom}) 
                            </Text>
                        ))}
                    </View>
                </View>
            )
        } 
    }

    if(saleprice == 0)
    {
        return(
            <View style = {styles.view}>
                <Advert/>
                <ScrollView style = {styles.scroll}>
                    <Photo name = {title}/>
                    <Text style = {styles.text}>{title}</Text>
                    <Text style = {styles.text}>R{price}</Text>
                    <Text style = {styles.text}>By {name} {surname}</Text>
                    <Text style = {styles.space}></Text>
                    <Text style = {styles.desc}>
                        Below are the available sizes. Please select a size for the given product. If the product requires two 
                        or three different sets of sizes, both charts will be provided to you for your convenience. Underwear 
                        and Bra sets require three sizes to choose from. Dresses, Jumpsuits, Bodysuits, etc, require two sizes.
                    </Text>
                    <Text style = {styles.s}></Text>
                    <Size top = {top} bottom = {bottom} bra = {bra} cup = {cup} list = {list} product = {product}/>
                    <Text style = {styles.s}></Text>
                    <Text style = {styles.desc}>
                        Below is a quantity selection bar. You can either increase or decrease the quantity of the chosen
                        product.
                    </Text>
                    <Text style = {styles.s}></Text>
                    <ScrollView
                        style={styles.qua}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={styles.buttonQ}
                            onPress={() => {updateQuantity(count - 1);}}>
                            <Text style={styles.buttonLabelQ}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.countQ}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.buttonQ}
                            onPress={() => {updateQuantity(count + 1);}}>
                            <Text style={styles.buttonLabelQ}>+</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style = {styles.space}></Text>
                    <Text style = {styles.space}></Text>
                    <TouchableOpacity style = {styles.button}
                        onPress = { () => {addData(title, price, product.top, product.bottom, product.bra, product.cup, quantity, id, supplier)}}>
                        <Text>Add To Cart</Text>
                    </TouchableOpacity>
                    <Text style = {styles.space}></Text>
                </ScrollView>
            </View>
        ); 
    }   
    else
    {
        return(
            <View style = {styles.view}>
                <Advert/>
                <ScrollView style = {styles.scroll}>
                    <Photo name = {title} />
                    <Text style = {styles.text}>{title}</Text>
                    <Text style = {styles.text}>Original Price: R{price}</Text>
                    <Text style = {styles.text}>Sale Price: R{saleprice}</Text>
                    <Text style = {styles.text}>By {name} {surname}</Text>
                    <Text style = {styles.space}></Text>
                    <Text style = {styles.desc}>
                        Below are the available sizes. Please select a size for the given product. If the product requires two 
                        or three different sets of sizes, both charts will be provided to you for your convenience. Underwear 
                        and Bra sets require three sizes to choose from. Dresses, Jumpsuits, Bodysuits, etc, require two sizes.
                    </Text>
                    <Text style = {styles.s}></Text>
                    <Size top = {top} bottom = {bottom} bra = {bra} cup = {cup} list = {list} product = {product}/>
                    <Text style = {styles.s}></Text>
                    <Text style = {styles.desc}>
                        Below is a quantity selection bar. You can either increase or decrease the quantity of the chosen
                        product.
                    </Text>
                    <Text style = {styles.s}></Text>
                    <ScrollView
                        style={styles.qua}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={styles.buttonQ}
                            onPress={() => {updateQuantity(count - 1);}}>
                            <Text style={styles.buttonLabelQ}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.countQ}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.buttonQ}
                            onPress={() => {updateQuantity(count + 1);}}>
                            <Text style={styles.buttonLabelQ}>+</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style = {styles.space}></Text>
                    <Text style = {styles.space}></Text>
                    <TouchableOpacity style = {styles.button}
                        onPress = { () => {addData(title, saleprice, product.top, product.bottom, product.cup, quantity, image, id, supplier)}}>
                        <Text>Add To Cart</Text>
                    </TouchableOpacity>
                    <Text style = {styles.space}></Text>
                </ScrollView>
            </View>
        ); 
    }
};

const styles = StyleSheet.create({
    view:
    {
        flex: 1,
        backgroundColor: 'white',
    },

    scroll:
    {
        width: '100%',
        paddingHorizontal: 5,
        margin: 5,
    },

    text:
    {
        fontFamily: 'sans-serif',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 1.5,
        margin: 1.5,
        color: 'black'
    },

    desc:
    {
        fontFamily: 'sans-serif',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 1.5,
        margin: 1.5,
        color: 'black'
    },

    space:
    {
        paddingBottom: 10
    },

    s:
    {
        paddingBottom: 0
    },

    button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#e6c2bf',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#e6c2bf',
        paddingVertical: 20,
        paddingHorizontal: 75
    },

    buttonText:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 2.5
    },

    qua: 
    {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 2.5,
        alignSelf: "center",
    },

    buttonQ: 
    {
        padding: 0,
        margin: 0,
        backgroundColor: "#e6c2bf",
        borderColor: "#e6c2bf",
        borderRadius: 100,
    },

    buttonLabelQ: 
    {
        color: "black",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    countQ: 
    {
        color: "black",
        fontFamily: "sans-serif",
        fontSize: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
    },

    scrollS:
    {
        flex: 1,
        width: '100%',
        paddingHorizontal: 3.5
    },

    chartS:
    { 
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    },

    descriptionS:
    { 
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    },

    combinationS:
    { 
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    },

    buttonS:
    {
        backgroundColor: '#e6c2bf',
        borderColor: '#e6c2bf',
        borderWidth: 4,
    },

    selectedS:
    {
        backgroundColor: 'black',
        color: '#e6c2bf',
        borderColor: '#e6c2bf',
    },

    buttonLabelS:
    {
        paddingHorizontal: 7.5,
        paddingVertical: 7.5,
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,    
    },

    selectedLabelS:
    {
        paddingHorizontal: 7.5,
        paddingVertical: 7.5,
        color: '#e6c2bf',
        borderColor: '#e6c2bf',
        fontFamily: 'sans-serif-thin',
        fontSize: 15, 
    }

});

export default Product;