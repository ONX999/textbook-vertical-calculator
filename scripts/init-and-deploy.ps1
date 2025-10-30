# Usage
# 1) Edit variables below
# 2) Run in PowerShell 7 or Windows PowerShell x64:  ./init-and-deploy.ps1
# 3) The script will init a new repo in current folder, commit files, and push to remote

# ========== Edit these variables ==========
$RepoUrl        = "git@github.com:USERNAME/NEW-REPO.git"
$TargetBranch   = "main"
$UseGitLfs      = $true
$CreateRemote   = $true    # if true will attempt to set origin and push
# ==========================================

function Fail([string]$msg) { Write-Error $msg; exit 1 }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "git 未安裝或無法使用。請安裝 Git 並重試。" }

# Initialize repository
if (-not (Test-Path ".git")) {
  Write-Output "初始化 Git repository..."
  git init -b $TargetBranch
}

# Ensure files exist
if (-not (Test-Path "index.html")) { Fail "找不到 index.html，請確認已將檔案放到當前資料夾。" }

if ($UseGitLfs) {
  if (Get-Command git-lfs -ErrorAction SilentlyContinue) {
    git lfs install --local
    git lfs track "*.png"
    git lfs track "*.jpg"
    git lfs track "*.svg"
    git add .gitattributes
  } else {
    Write-Warning "系統未安裝 git-lfs，跳過 LFS 配置。"
  }
}

git add --all
git commit -m "Initial commit: final package"

if ($CreateRemote) {
  Write-Output "設定遠端 origin 為 $RepoUrl"
  git remote remove origin 2>$null
  git remote add origin $RepoUrl
  Write-Output "推送到遠端分支 $TargetBranch..."
  git push -u origin $TargetBranch
  if ($LASTEXITCODE -ne 0) { Fail "git push 失敗。請確認 RepoUrl 與權限(PAT 或 SSH key)。" }
} else {
  Write-Output "已完成本地初始化與提交，未設定遠端。"
}

Write-Output "初始化完成。請前往 GitHub 開啟 repository 並確認 Pages 設定，或在 repo Settings → Pages 啟用 Pages 發佈。"
