# ============================================================
# GitHub-ga loyihani yuklash skripti
# Ishlatish: PowerShell'ni ochib, skriptni ishga tushiring
# ============================================================

$projectPath = "C:\Users\Admin\Desktop\52.1.0.1"
$repoUrl = "https://github.com/byzenuz/antanta.git"

Write-Host "=== GitHub Upload Script ===" -ForegroundColor Cyan

# Git mavjudligini tekshirish
$gitPath = "C:\Program Files\Git\bin\git.exe"
if (-not (Test-Path $gitPath)) {
    Write-Host ""
    Write-Host "Git o'rnatilmagan! Yuklab olish..." -ForegroundColor Yellow
    Write-Host ""
    
    # Git installer yuklab olish
    $installerPath = "$env:TEMP\GitInstaller.exe"
    Write-Host "Git yuklanmoqda (internet kerak)..." -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.47.0.windows.2/Git-2.47.0.2-64-bit.exe" -OutFile $installerPath -UseBasicParsing
        Write-Host "Git o'rnatilmoqda..." -ForegroundColor Yellow
        Start-Process -FilePath $installerPath -Args "/VERYSILENT /NORESTART" -Wait
        Write-Host "Git o'rnatildi!" -ForegroundColor Green
        $env:PATH += ";C:\Program Files\Git\bin"
    } catch {
        Write-Host "XATO: Git yuklab olinmadi. Qo'lda o'rnating: https://git-scm.com" -ForegroundColor Red
        exit 1
    }
}

# PATH ga git qo'shish
$env:PATH += ";C:\Program Files\Git\bin"
$git = "C:\Program Files\Git\bin\git.exe"

Set-Location $projectPath

Write-Host ""
Write-Host "Loyiha papkasi: $projectPath" -ForegroundColor White

# Git repo boshlash
if (-not (Test-Path ".git")) {
    Write-Host "Git repo boshlanmoqda..." -ForegroundColor Yellow
    & $git init
    & $git remote add origin $repoUrl
    Write-Host "Remote qo'shildi: $repoUrl" -ForegroundColor Green
} else {
    Write-Host "Git repo allaqachon mavjud" -ForegroundColor Green
    # Remote URL ni yangilash
    & $git remote set-url origin $repoUrl
}

# Barcha fayllarni qo'shish
Write-Host ""
Write-Host "Barcha fayllar qo'shilmoqda..." -ForegroundColor Yellow
& $git add .

# Commit qilish
$commitMsg = "full project upload - fix Vercel build"
Write-Host "Commit qilinmoqda: $commitMsg" -ForegroundColor Yellow
& $git commit -m $commitMsg

# GitHub'ga yuklash
Write-Host ""
Write-Host "GitHub'ga yuklash boshlandi..." -ForegroundColor Yellow
Write-Host "DIQQAT: Username va password so'ralishi mumkin!" -ForegroundColor Cyan
Write-Host "(Parol o'rniga GitHub Personal Access Token ishlating)" -ForegroundColor Cyan
Write-Host ""

& $git push origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "MUVAFFAQIYAT! Loyiha GitHub'ga yuklandi!" -ForegroundColor Green
    Write-Host "Vercel avtomatik ravishda qayta build qiladi." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "XATO: Yuklash amalga oshmadi." -ForegroundColor Red
    Write-Host "GitHub Personal Access Token kerak bo'lishi mumkin." -ForegroundColor Yellow
    Write-Host "Token olish: https://github.com/settings/tokens" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Tugadi. Enter bosing..." -ForegroundColor White
Read-Host
