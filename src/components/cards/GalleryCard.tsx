import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Image } from "@/types/image";

export default function GalleryCard({
  image,
  onClick,
}: {
  image: Image;
  onClick: () => void;
}) {
  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={image?.url}
        alt={image?.name}
        sx={{
          height: 200,
          // width: 250,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
          noWrap
        >
          {image.name}
        </Typography>
        {image?.metadata?.resolution && (
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            {image?.metadata?.resolution}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
