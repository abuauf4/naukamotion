-- AlterTable
ALTER TABLE "ProjectMedia" ADD COLUMN     "bytes" INTEGER,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "width" INTEGER;

-- CreateIndex
CREATE INDEX "ProjectMedia_publicId_idx" ON "ProjectMedia"("publicId");
