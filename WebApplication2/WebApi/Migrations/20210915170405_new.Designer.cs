﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.models;

namespace WebApi.Migrations
{
    [DbContext(typeof(Database))]
    [Migration("20210915170405_new")]
    partial class @new
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApi.models.Connection", b =>
                {
                    b.Property<int>("ConnectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConnectionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DbName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DbPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DbUserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ServerIp")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("ConnectionId");

                    b.HasIndex("UserId");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("WebApi.models.Dataset", b =>
                {
                    b.Property<int>("DatasetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DatasetName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsLiked")
                        .HasColumnType("bit");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("DatasetId");

                    b.HasIndex("UserId");

                    b.ToTable("Datasets");
                });

            modelBuilder.Entity("WebApi.models.Pipeline", b =>
                {
                    b.Property<int>("PipelineId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("InputDataset")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InputDatasetId")
                        .HasColumnType("int");

                    b.Property<string>("OutputDataset")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OutputDatasetId")
                        .HasColumnType("int");

                    b.Property<string>("PipelineName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("PipelineId");

                    b.HasIndex("UserId");

                    b.ToTable("Pipelines");
                });

            modelBuilder.Entity("WebApi.models.Process", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Inputs")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Instruction")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PipelineId")
                        .HasColumnType("int");

                    b.Property<string>("Position")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProcessId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PipelineId");

                    b.ToTable("Process");
                });

            modelBuilder.Entity("WebApi.models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsLoggedIn")
                        .HasColumnType("bit");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.models.Connection", b =>
                {
                    b.HasOne("WebApi.models.User", null)
                        .WithMany("UserConnections")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebApi.models.Dataset", b =>
                {
                    b.HasOne("WebApi.models.User", null)
                        .WithMany("UserDatasets")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebApi.models.Pipeline", b =>
                {
                    b.HasOne("WebApi.models.User", null)
                        .WithMany("Pipelines")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebApi.models.Process", b =>
                {
                    b.HasOne("WebApi.models.Pipeline", null)
                        .WithMany("Processes")
                        .HasForeignKey("PipelineId");
                });

            modelBuilder.Entity("WebApi.models.Pipeline", b =>
                {
                    b.Navigation("Processes");
                });

            modelBuilder.Entity("WebApi.models.User", b =>
                {
                    b.Navigation("Pipelines");

                    b.Navigation("UserConnections");

                    b.Navigation("UserDatasets");
                });
#pragma warning restore 612, 618
        }
    }
}
