import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { ArrowRight, DeleteForever, Edit, ManageAccounts, Search } from "@mui/icons-material";
import styled from "@emotion/styled";
import logo from "../images/logo.png";
import Image from "../components/image";
import { useNavigate } from "react-router-dom";
import { setNewPage, setUsers } from "../state/state";

function HomePage() {
      const navigate=useNavigate();

    // const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const serverLink=useSelector((state)=> state.serverLink);
    let currPage = useSelector((state) => state.currPage);
    let users = useSelector((state) => state.users);
    let totalPages = useSelector((state) => state.totalPages);
    const dispatch=useDispatch();

    const theme = useTheme();
    const primaryMain = theme.palette.primary.main;

    const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
  const [formData, setFormData] = useState({
    avatar: "",
    first_name: "",
    last_name: "",
    email: "",
  });

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    let [query,setQuery] = useState("");

    const getUsers = useCallback(async (newPage = 1) => {
      console.log('ok');
      if (currPage === newPage) return;
      try {
        const response = await fetch(`${serverLink}/api/users?page=${newPage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setNewPage(data));
        } else {
          alert("Unable to fetch Users list.");
        }
      } catch (error) {
        alert("Internal Server Error! Please try again later..");
      }
    }, [currPage, serverLink, dispatch]);
    

    const deleteUser= async (userId)=>{
        try {
          const response = await fetch(`${serverLink}/api/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const updatedUsers = users.filter(user => user.id !== userId);
            dispatch(
              setUsers(updatedUsers)
            );
            alert("user deleted successfully.");
          } else {
            alert("Unable to delete the User.");
          }
        } catch (error) {
          alert("Internal Server Error! Please try again later..");
        }
    }

    const handleEdit = (user) => {
      setEditingUser(user.id); // Track the user being edited
      setFormData({ ...user }); // Populate form data with user details
    };
  
    const handleSave = async () => {
      try {
        const response = await fetch(`${serverLink}/api/users/${editingUser}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const updatedUsers = users.map((user) =>
            user.id === editingUser ? { ...user, ...formData } : user
          );
          dispatch(setUsers(updatedUsers));
          setEditingUser(null); // Exit edit mode
          alert("User details updated successfully.");
        } else {
          alert("Unable to update user details.");
        }
      } catch (error) {
        alert("Internal Server Error! Please try again later..");
      }
    };
  
    const handleCancel = () => {
      setEditingUser(null); // Exit edit mode
    };
  

    useEffect(() => {
      getUsers(currPage);
    }, [getUsers, currPage]);
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePageChange = async (event,value)=>{
      await getUsers(value);
    }

    const handleSearch= async ()=>{
      const qry=document.getElementById("searchQuery");
      setQuery(qry.value);
    }

    const filteredUsers = users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const email = user.email.toLowerCase();
      return (
        fullName.includes(query.toLowerCase()) || email.includes(query.toLowerCase())
      );
    });
    
    const SpecialButton=styled(IconButton)({
      backgroundColor: `${primaryMain} !important`,
      margin: "1rem",
      position: "fixed",
      zIndex: "100",
      boxShadow: "2px 2px 2px black",
      color: "black"
  });

    const VerticalFlex=styled(Box)({
      display:"flex",
      flexDirection:"column"
    })

    const CenteredBox=styled(Box)({
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    })

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation"
    // onClick={toggleDrawer(false)}
    >
      <VerticalFlex>
        <CenteredBox paddingLeft="20%">
            <Image link={logo} size="75%" />
        </CenteredBox>
        <CenteredBox>
            <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#c5b458"
            borderRadius="30px"
            padding="0 10px"
            margin="5px 15px"
            onClick={() => {navigate("/")}}
            sx={{
              "&:hover": {
                color: "#958636",
                cursor: "pointer",
                backgroundColor: `${primaryMain} !important`,
                boxShadow: `10px 0px darkblue, -10px 0px darkblue`,
                textShadow : "3px 3px 3px darkblue"
              },
            }}>
                Home
            </Typography>
        </CenteredBox>
        <Divider />
        <CenteredBox marginTop="10px">
            <Typography fontWeight="bold"
            fontSize="clamp(0.7rem, 1.4rem, 1.1rem)"
            color="#c5b458" >
                Welcome Eve
            </Typography>
        </CenteredBox>
        <Box margin="10px 5px" display="flex" flexWrap="wrap">
            <Typography
            color="#c5b458">
               Email : <p style={{fontWeight:"bold", margin:"0", padding:"0"}}>eve.holt@reqres.in</p>
            </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
                  label="Search here"
                  id="searchQuery"
                />
            <IconButton margin="0 5px" onClick={handleSearch} >
                <Search />
            </IconButton>
            </Box>
      </VerticalFlex>
    </Box>
  );
  return (
    <Box minHeight="100vh">
      <Navbar home={true} />
      <SpecialButton  onClick={toggleDrawer(true)}><ManageAccounts /> <ArrowRight /></SpecialButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        </Drawer>
      <Box display="flex" alignItems="center" justifyContent="center" >
        <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
            >
              {query!==""?"Query : "+query:"Home"}
            </Typography>
        </Box>
      <Box
        width="100%"
        display="flex"
        padding="1rem"
        flexWrap="wrap"
        gap="1.5rem"
        justifyContent="space-between"
      >
        {filteredUsers && filteredUsers.map((user)=>{
          return <Box key={user.id} padding="2px" sx={{
            boxShadow: `7px 7px 7px gray`,
            minHeight: "210px",
            width: editingUser === user.id ? "100%" : "200px",
            "&:hover": {
              cursor: "pointer",
              boxShadow: `7px 7px 7px ${primaryMain}`,
              textShadow : "1px 1px 1px darkblue",
              border: `1px solid ${primaryMain} !important`,
              padding: "1px",
            },
          }}>
            {editingUser === user.id ? (
                <Box sx={{
    padding: "5% 10% !important"
                }}>
                  <Image size="200px" link={user.avatar} rectangle={true} />
                  <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>

            <Image size="200px" link={user.avatar} rectangle={true} name={user.first_name + " " + user.last_name} />
            <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton sx={{
              margin:"0 5px",
              padding: "5px"
            }} onClick={()=> handleEdit(user)} >
                <Edit fontSize="small" />
            </IconButton>
            <IconButton sx={{
              margin:"0 5px",
              padding: "5px"
            }}
              onClick={()=>{deleteUser(user.id)}} 
              >
                <DeleteForever fontSize="small" />
            </IconButton>
            </Box>
            </Box>
              )}
          </Box>
        })}
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="20px 0"
    >
      {Number(totalPages)>1 && <Pagination count={totalPages} page={currPage} size="small" onChange={handlePageChange} color="primary" sx={{
        background:"rgba(125,125,125,0.2)",
        borderRadius:"15px",
        padding:"5px 10px"
      }} />}
    </Box>
    {filteredUsers.length===0 && <CenteredBox sx={{
      fontSize:"30px",
      fontWeight:"700",
      color:"gray"
    }} >No Users to Display</CenteredBox>}
    </Box>
  );
}

export default HomePage;
