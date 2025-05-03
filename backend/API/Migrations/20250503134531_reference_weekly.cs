using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class reference_weekly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyWorkout_Users_UserId",
                table: "WeeklyWorkout");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WeeklyWorkout",
                table: "WeeklyWorkout");

            migrationBuilder.RenameTable(
                name: "WeeklyWorkout",
                newName: "WeeklyWorkouts");

            migrationBuilder.RenameIndex(
                name: "IX_WeeklyWorkout_UserId",
                table: "WeeklyWorkouts",
                newName: "IX_WeeklyWorkouts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WeeklyWorkouts",
                table: "WeeklyWorkouts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyWorkouts_Users_UserId",
                table: "WeeklyWorkouts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyWorkouts_Users_UserId",
                table: "WeeklyWorkouts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WeeklyWorkouts",
                table: "WeeklyWorkouts");

            migrationBuilder.RenameTable(
                name: "WeeklyWorkouts",
                newName: "WeeklyWorkout");

            migrationBuilder.RenameIndex(
                name: "IX_WeeklyWorkouts_UserId",
                table: "WeeklyWorkout",
                newName: "IX_WeeklyWorkout_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WeeklyWorkout",
                table: "WeeklyWorkout",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyWorkout_Users_UserId",
                table: "WeeklyWorkout",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
