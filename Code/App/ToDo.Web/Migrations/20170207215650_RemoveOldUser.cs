using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ToDo.Web.Migrations
{
    public partial class RemoveOldUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_OldUsers_OldUserId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "OldUsers");

            migrationBuilder.DropIndex(
                name: "IX_Items_OldUserId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "OldUserId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Items");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OldUserId",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OldUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    EmailId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OldUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_OldUserId",
                table: "Items",
                column: "OldUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_OldUsers_OldUserId",
                table: "Items",
                column: "OldUserId",
                principalTable: "OldUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
