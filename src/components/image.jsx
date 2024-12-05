import { Box, Typography } from "@mui/material";

const Image = ({ size="60px", link, rectangle=false, name }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <img
        style={{ objectFit: "cover", borderRadius: rectangle?"10px":"50%", maxWidth:`${size}`, maxHeight:`${size}` }}
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