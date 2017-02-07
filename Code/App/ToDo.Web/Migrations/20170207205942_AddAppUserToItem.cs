using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDo.Web.Migrations
{
    public partial class AddAppUserToItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Items",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_AppUserId",
                table: "Items",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_AspNetUsers_AppUserId",
                table: "Items",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_AspNetUsers_AppUserId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_AppUserId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Items");
        }
    }
}
