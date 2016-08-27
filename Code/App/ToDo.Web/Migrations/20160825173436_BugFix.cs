using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ToDo.Web.Migrations
{
    public partial class BugFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubItem_Items_ItemId",
                table: "SubItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubItem",
                table: "SubItem");

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PriorityLevel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubItems",
                table: "SubItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubItems_Items_ItemId",
                table: "SubItem",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_SubItem_ItemId",
                table: "SubItem",
                newName: "IX_SubItems_ItemId");

            migrationBuilder.RenameTable(
                name: "SubItem",
                newName: "SubItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubItems_Items_ItemId",
                table: "SubItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubItems",
                table: "SubItems");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubItem",
                table: "SubItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubItem_Items_ItemId",
                table: "SubItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_SubItems_ItemId",
                table: "SubItems",
                newName: "IX_SubItem_ItemId");

            migrationBuilder.RenameTable(
                name: "SubItems",
                newName: "SubItem");
        }
    }
}
