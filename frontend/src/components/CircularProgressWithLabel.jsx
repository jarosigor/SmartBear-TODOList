import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

function CircularProgressWithLabel(props, { tasksStats, calendarValue }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={200}
        variant="determinate"
        {...props}
        tasksStats={tasksStats}
        calendarValue={calendarValue}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          fontWeight="bold" // Adjust the font weight for emphasis
          style={{ marginBottom: "8px" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   *@default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ tasksStats, calendarValue }) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(tasksStats["dayStats"]);
  }, [tasksStats, calendarValue]);

  return <CircularProgressWithLabel value={progress} />;
}
