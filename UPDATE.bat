@echo off
git pull
if errorlevel 1 (
  echo 更新失败，请检查上方错误信息...
  pause
) else (
  exit
)