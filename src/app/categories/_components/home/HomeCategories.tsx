"use client";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { getCategoryColor, getCategoryIcon } from "@/constants";
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
import { useCategoriesHome } from "../../_hooks/useCategoriesHome";
import AddEditCategory from "../add-edit/AddEditCategory";
import PageHeader from "@/components/header/PageHeader";

export default function HomeCategories() {
  const {
    categories,
    isLoading,
    error,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedCategory,
    setSelectedCategory,
    hoveredId,
    setHoveredId,
    handleCreate,
    handleEdit,
    handleDelete,
    handleView,
    handleFormSubmit,
    handleConfirmDelete,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCategoriesHome();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
        <PageHeader
          title="Categories"
          buttonText="Create Category"
          onClick={handleCreate}
        />

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
