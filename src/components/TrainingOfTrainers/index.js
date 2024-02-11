import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  CommonForgeHeader,
  CommonSwiper,
  StyledLoadingButton,
} from "../common/Components";
import { Image } from "@rsuite/icons";
import { Grid, TextField, MenuItem } from "@mui/material";
import React from "react";
import { List } from "rsuite";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";
import FormBackGround from "../../../src/asserts/Form-HeadBg.jpg";
import ForgeYellowBackGround from "../../../src/asserts/Yellow_background.jpg";

function TrainingOfTrainers() {
  const [mode, setMode] = React.useState("");

  const handleChange = (event) => {
    setMode(event.target.value);
  };
 
  const images = [
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
    { image: "https://placehold.co/600x400" },
  ];

  const data = {
    cover_image: "https://placehold.co/600x400",
    title: "Secret Tips & Tips For increasing Citations",
    Fee:"",
    time:"",
    date:"",
    objective_of_the_training:"",
    objectives :[
        "Unlock Hidden Strategies: Discover the often-overlooked tactics that can make a substantial difference in the citation rates of academic publications",
        "Craft Compelling Titles and Abstracts: Learn how to craft titles and abstracts that are not only informative but also attention grabbing, enticing fellow researchers to explore your work further",
        "Navigate Journal Selection: Understand the nuances of choosing the right journals for your research, optimizing visibility, and targeting the right audience",
      ],
    description:
      " Are you a researcher, academic, or educator seeking to amplify the impact of your scholarly work? Join us for an engaging and enlightening Training for Trainers: Unveiling Secret Tips for Maximizing Your Citations.* This unique and interactive workshop is tailored to empower trainers with the knowledge and strategies needed to help others enhance the visibility and influence of their research in the academic world Are you a researcher, academic, or educator seeking to amplify the impact of your scholarly work? Join us for an engaging and enlightening Training for Trainers: Unveiling Secret Tips for Maximizing Your Citations.* This unique and interactive workshop is tailored to empower trainers with the knowledge and strategies needed to help others enhance the visibility and influence of their research in the academic world",
  };

  return (
    <Box>
      <Box sx={{ border: "10px solid red", height: "100px" }}>Header</Box>

      <Box sx={{backgroundImage:`url(${ForgeYellowBackGround})`}}>
        <CommonForgeHeader />
      </Box>

      <Box>
        <Box sx={{ height: "400px" }}>
          <CommonSwiper images={images} />
        </Box>
      </Box>

      <Box
        sx={{
          p: "30px",
          backgroundImage: `url(${FormBackGround})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Paper sx={{ p: "10px" }}>
          <Box
            sx={{
              display: "grid",
              gap: "30px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={data.cover_image}
              />
            </Box>

            <Typography variant={"h5"} p={"10px"}> {data.title}</Typography>
          </Box>

          <Box sx={{ width: "80%", height: "auto", m: "auto", mt: "30px" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  id="time"
                  label="Time"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="date"
                  sx={{ width: "100%" }}
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  id="mode"
                  select
                  label="Mode"
                  value={mode}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Venue"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Fee"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ border: "1px solid gray", p: "30px", mt: "10px" }}>
            <Typography variant="p">{data.description}</Typography>
          </Box>

          <Box sx={{ mt: "30px" }}>
            <Typography variant="h3" component="p">
              Objectives
            </Typography>

            {data.objectives.map((objective, index) => (
              <ListItem key={index}>
                <ListItemIcon>{index + 1}.</ListItemIcon>
                <ListItemText primary={objective} />
              </ListItem>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: "30px",
              }}
            >
              <StyledLoadingButton sx={{ border: "20px" }}>
                Register Now!
              </StyledLoadingButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
export default TrainingOfTrainers;
