import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { getUser } from "../contexts_store/reducer/user";

const ProfilePage = () => {
  const user = useSelector(getUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (user) {
      //console.log(user);
      setName(user.name);
      setEmail(user.email);
      setImgSrc(user.profilePic);
    }
  }, [user])

  const handleSave = () => {
    // Logic to save changes goes here
    console.log("Changes saved!");
  };

  return (
    <Box className="outer" display="flex" justifyContent="center" alignItems="center" minW="100vh" minHeight="100vh">
      <Box className="inner" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" minW="80vh" minHeight="80vh">
        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <Avatar size="xl" src={imgSrc} />
          <EditIcon ml={2} cursor="pointer" />
        </Box>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} isDisabled />
        </FormControl>
        <FormControl id="newPassword" mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input type="password" value={currPassword} onChange={(e) => { setCurrPassword(e.target.value) }} />
        </FormControl>
        <FormControl id="currPassword" isRequired mb={4}>
          <FormLabel>Current Password</FormLabel>
          <Input type="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
        </FormControl>
        <Button onClick={handleSave} colorScheme="blue" mt={4} w="100%">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
