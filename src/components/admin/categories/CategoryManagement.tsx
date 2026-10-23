"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
} from "@/lib/actions/categories";

import type {
  CategoryInput,
  ServiceCategory,
} from "@/components/admin/categories/categoryTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function extractCategories(result: unknown): ServiceCategory[] {
  if (Array.isArray(result)) {
    return result as ServiceCategory[];
  }

  if (!result || typeof result !== "object") {
    throw new Error("API থেকে সঠিক response পাওয়া যায়নি।");
  }

  const response = result as {
    success?: boolean;
    message?: string;
    data?: unknown;
  };

  if (response.success === false) {
    throw new Error(response.message || "Category লোড করা যায়নি।");
  }

  const data = response.data;

  if (Array.isArray(data)) {
    return data as ServiceCategory[];
  }

  if (data && typeof data === "object") {
    const nested = data as {
      serviceCategories?: unknown;
      categories?: unknown;
    };

    if (Array.isArray(nested.serviceCategories)) {
      return nested.serviceCategories as ServiceCategory[];
    }

    if (Array.isArray(nested.categories)) {
      return nested.categories as ServiceCategory[];
    }
  }

  throw new Error("Category response-এ data.serviceCategories পাওয়া যায়নি।");
}

function getActionError(result: unknown): string | null {
  if (
    result &&
    typeof result === "object" &&
    "success" in result &&
    result.success === false
  ) {
    return "message" in result && typeof result.message === "string"
      ? result.message
      : "Request সম্পন্ন করা যায়নি।";
  }

  return null;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getCategoriesAction();
      const categoryList = extractCategories(result);
      setCategories(categoryList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Category লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchCategories() {
      try {
        const result = await getCategoriesAction();
        const categoryList = extractCategories(result);

        if (active) {
          setCategories(categoryList);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Category লোড করা যায়নি।",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  function resetForm() {
    setName("");
    setDescription("");
    setEditingId(null);
    setError("");
    setMessage("");
  }

  function startEditing(category: ServiceCategory) {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description ?? "");
    setError("");
    setMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category-এর নাম লিখুন।");
      return;
    }

    const payload: CategoryInput = {
      name: trimmedName,
      description: description.trim(),
    };

    setSaving(true);

    try {
      const result = editingId
        ? await updateCategoryAction(editingId, payload)
        : await createCategoryAction(payload);

      const actionError = getActionError(result);

      if (actionError) {
        throw new Error(actionError);
      }

      setMessage(
        editingId
          ? "Category সফলভাবে আপডেট হয়েছে।"
          : "Category সফলভাবে তৈরি হয়েছে।",
      );

      setName("");
      setDescription("");
      setEditingId(null);

      await loadCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Category সংরক্ষণ করা যায়নি।",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: ServiceCategory) {
    const confirmed = window.confirm(
      `"${category.name}" Category মুছে ফেলতে চাও?`,
    );

    if (!confirmed) return;

    setDeletingId(category.id);
    setError("");
    setMessage("");

    try {
      const result = await deleteCategoryAction(category.id);

      const actionError = getActionError(result);

      if (actionError) {
        throw new Error(actionError);
      }

      setMessage("Category সফলভাবে মুছে ফেলা হয়েছে।");

      if (editingId === category.id) {
        resetForm();
      }

      await loadCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Category মুছে ফেলা যায়নি।",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
        <p className="mt-2 text-muted-foreground">
          Service Category তৈরি, সম্পাদনা এবং পরিচালনা করো।
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Category" : "Create Category"}
          </CardTitle>
          <CardDescription>
            Category-এর নাম এবং ঐচ্ছিক Description দাও।
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="যেমন: Electrical"
                maxLength={255}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-description">
                Description (Optional)
              </Label>
              <Textarea
                id="category-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Category সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                rows={3}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Category"
                    : "Create Category"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>
                মোট Category: {categories.length}
              </CardDescription>
            </div>

            <Button
              variant="outline"
              onClick={() => void loadCategories()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="py-8 text-center text-muted-foreground">
              Category লোড হচ্ছে...
            </p>
          ) : categories.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-medium">এখনো কোনো Category তৈরি করা হয়নি।</p>
              <p className="mt-2 text-sm text-muted-foreground">
                উপরের Form ব্যবহার করে প্রথম Category তৈরি করো।
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>

                      <TableCell className="max-w-xs whitespace-normal">
                        {category.description || "—"}
                      </TableCell>

                      <TableCell>
                        {Array.isArray(category.services)
                          ? category.services.length
                          : "—"}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(category)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deletingId === category.id}
                            onClick={() => void handleDelete(category)}
                          >
                            {deletingId === category.id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
