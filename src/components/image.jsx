import { Box, Typography } from "@mui/material";

const Image = ({ size="60px", link, rectangle=false, name }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <img
        style={{ objectFit: "cover", borderRadius: rectangle?"0%":"50%", maxWidth:`${size}`, maxHeight:`${size}`, borderRadius: "10px" }}
        alt="pic"
        src={link}
      />
      {name && <Typography sx={{
        textAlign:"center",
        margin:"10px 0"
      }}>
        {name}
      </Typography>}
    </Box>
  );
};

export default Image;