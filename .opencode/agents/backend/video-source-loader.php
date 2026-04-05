<?php
header('Content-Type: application/json');

// Get query parameters
$type = isset($_GET['type']) ? $_GET['type'] : null;
$tmdbId = isset($_GET['tmdbId']) ? $_GET['tmdbId'] : null;
$season = isset($_GET['season']) ? $_GET['season'] : null;
$episode = isset($_GET['episode']) ? $_GET['episode'] : null;

// Validate
if (!$type || !$tmdbId) {
    echo json_encode([]);
    exit;
}

// Array to hold all sources
$sources = [];

// VidCore (autoplay first)
if ($type === "movie") {
    $sources[] = [
        "url" => "https://vidcore.net/movie/" . $tmdbId,
        "name" => "VidCore",
        "requiresAuth" => false
    ];
} elseif ($type === "tv") {
    if ($season && $episode) {
        $sources[] = [
            "url" => "https://vidcore.net/tv/" . $tmdbId . "/" . $season . "/" . $episode,
            "name" => "VidCore",
            "requiresAuth" => false
        ];
    }
}

// Example: add a second dummy source (you can remove later)
$sources[] = [
    "url" => "https://fakesource.net/movie/" . $tmdbId,
    "name" => "Fakesource",
    "requiresAuth" => false
];

// Return JSON
echo json_encode($sources);
?>