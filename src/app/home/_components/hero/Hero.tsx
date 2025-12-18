import { Box, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 4,
        p: 6,
        color: "white",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        Daily hit of interactive design and showcase of{" "}
        <Box component="span" sx={{ color: "#a8d8ff" }}>
          creativity
        </Box>
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
        We proudly highlight one brilliant interactive project each day.
      </Typography>
      {/* <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(0,0,0,0.2)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": { bgcolor: "rgba(0,0,0,0.3)" },
                }}
              >
                View Today&apos;s Project
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Get Daily Email
              </Button>
            </Box> */}
    </Box>
  );
}
