import React, { useState, useContext, useEffect } from "react";
import { RegisterContainer, RegisterTitle, RegisterWrapper } from "./RegisterElements";
import { Button, Form, Input, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const { isAuth, register } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth === true){
            navigate("/")
        }
    }, [isAuth])

    function onFinish(values) {
        register(values)
    }

    return (
        <RegisterContainer>
            <RegisterWrapper>
                <RegisterTitle>Inscription</RegisterTitle>
                <Form
                    name="register"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Pseudo"
                        name="username"
                        rules={[{ required: true, message: 'Veuillez entrer votre pseudo !' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="mail"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: "Ce n'est pas une email valide !",
                            },
                            {
                                required: true,
                                message: 'Veuillez entrez votre email !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    
                    <Form.Item
                        label="URL de l'image"
                        name="img_url"
                        rules={[{ required: true, message: "Veuillez entrez une URL d'image !" }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            S'inscrire
                        </Button>
                    </Form.Item>
                </Form>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Register;