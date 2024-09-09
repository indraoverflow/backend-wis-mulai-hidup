/*
  Warnings:

  - A unique constraint covering the columns `[theme_name]` on the table `theme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "theme_theme_name_key" ON "theme"("theme_name");
