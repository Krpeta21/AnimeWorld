import React, {useState} from "react"
import {render} from "react-dom"
import { StyleSheet, View, Text} from "react-native"
import { ListItem , Icon} from "react-native-elements"
import Modal from "../Modal"
import ChangeDisplayNameform from "./ChangeDisplayNameForm"
import ChangeDisplayEmail from "./ChangeDisplayEmail"
import ChangeDisplayPassword from "./ChangeDisplayPassword"

export default function UserOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal,setShowModal] = useState(false)
    const [renderComponent,setRenderComponent] = useState(null)

    const selectedComponent = (key) =>{
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameform
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo ={setReloadUserInfo}
                    />
                )
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(<ChangeDisplayEmail
                    displayEmail={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo= {setReloadUserInfo}
                    />)
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(<ChangeDisplayPassword
                    toastRef={toastRef}
                    setShowModal={setShowModal}                                        
                    />)
                setShowModal(true)
                break            
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
        }
    }
    const menuOptions = generateOptions(selectedComponent)

    return (
        <View >
            {menuOptions.map((menu, index)=>(
                <ListItem key={index} bottomDivider onPress={menu.onPress} >
                    <Icon name = {menu.iconNameLeft}/>
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
            {renderComponent &&(
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
            )}
        </View>
    )
}

function generateOptions(selectedComponent){
    return[
       
        {
            title: 'Cambiar nombre y apellido',
            iconNameLeft: 'account-circle',
            onPress: ()=> selectedComponent('displayName')
        },

        {
            title: 'Cambiar email',
            iconNameLeft: 'drafts',
            onPress: ()=> selectedComponent('displayEmail')
        },
        {
            title: 'Cambiar password',
            iconNameLeft: 'lock',
            onPress: ()=> selectedComponent('displayPassword')
        }        
    ]
}

