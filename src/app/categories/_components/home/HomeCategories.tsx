"use client";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { getCategoryColor, getCategoryIcon } from "@/constants";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/services/category.service";
import { Category } from "@/types/category";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddEditCategory from "../add-edit/AddEditCategory";

export default function HomeCategories() {
  const router = useRouter();
  const { data: categories, isLoading, error } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleCreate = () => {
    setSelectedCategory(undefined);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleView = (category: Category) => {
    router.push(`/categories/${category.id}`);
  };

  const handleFormSubmit = (data: { name: string; description?: string }) => {
    if (selectedCategory) {
      updateMutation.mutate(
        { id: selectedCategory.id, data },
        {
          onSuccess: () => {
            setFormOpen(false);
            setSelectedCategory(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedCategory(undefined);
        },
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        background: "linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            Categories
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Create Category
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            Failed to load categories. Please try again.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={category.id}>
                  <Tooltip title={category.description || category.name} arrow>
                    <Paper
                      elevation={hoveredId === category.id ? 8 : 2}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        borderRadius: 3,
                        backgroundColor: getCategoryColor(category.id),
                        color: "white",
                        position: "relative",
                        minHeight: 140,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        },
                      }}
                      onMouseEnter={() => setHoveredId(category.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleView(category)}
                    >
                      <Box
                        sx={{
                          fontSize: "3rem",
                          fontWeight: 700,
                          mb: 1,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        {getCategoryIcon(category.name)}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          opacity: 0.95,
                        }}
                        noWrap
                      >
                        {category.name}
                      </Typography>
                      {hoveredId === category.id && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            display: "flex",
                            gap: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(category);
                            }}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(category);
                            }}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Paper>
                  </Tooltip>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  No categories found. Create one to get started.
                </Alert>
              </Grid>
            )}
          </Grid>
        )}

        <AddEditCategory
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedCategory(undefined);
          }}
          onSubmit={handleFormSubmit}
          category={selectedCategory}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedCategory(undefined);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
          isLoading={deleteMutation.isPending}
        />
      </Container>
    </Box>
  );
}
