"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import PageHeader from "@/components/header/PageHeader";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { Alert, Box, CircularProgress, Container, Grid } from "@mui/material";
import { useCategoriesHome } from "../../_hooks/useCategoriesHome";
import AddEditCategory from "../add-edit/AddEditCategory";

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
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={category.id}>
                  <CategoryCard
                    category={category}
                    onClick={() => handleView(category)}
                    onClickEdit={() => handleEdit(category)}
                    onClickDelete={() => handleDelete(category)}
                    isAbleAction={true}
                  />
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
