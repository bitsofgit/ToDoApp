using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ToDo.Web.Data;

namespace ToDo.Web.Migrations
{
    [DbContext(typeof(ToDoContext))]
    [Migration("20160827045107_MadeDueByNullable")]
    partial class MadeDueByNullable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ToDo.Web.Data.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Class");

                    b.Property<DateTime?>("CompletedOn");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<DateTime?>("DueBy");

                    b.Property<int?>("PriorityId");

                    b.Property<int>("Status");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("PriorityId");

                    b.HasIndex("UserId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("ToDo.Web.Data.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PriorityLevel");

                    b.HasKey("Id");

                    b.ToTable("Priorities");
                });

            modelBuilder.Entity("ToDo.Web.Data.SubItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("ItemId");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.ToTable("SubItems");
                });

            modelBuilder.Entity("ToDo.Web.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("EmailId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ToDo.Web.Data.Item", b =>
                {
                    b.HasOne("ToDo.Web.Data.Priority", "Priority")
                        .WithMany()
                        .HasForeignKey("PriorityId");

                    b.HasOne("ToDo.Web.Data.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ToDo.Web.Data.SubItem", b =>
                {
                    b.HasOne("ToDo.Web.Data.Item", "Item")
                        .WithMany("SubItems")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
