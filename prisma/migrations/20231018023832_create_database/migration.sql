-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT', 'ELDERLY');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('LOW', 'AVERAGE', 'HIGH');

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy" "Energy" NOT NULL,
    "independence" "Independence" NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPictures" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "AdoptionRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPictures" ADD CONSTRAINT "PetPictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequirements" ADD CONSTRAINT "AdoptionRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
