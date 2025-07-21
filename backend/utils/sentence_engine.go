package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"os"
	"path/filepath"
	"time"
)

type Sentence struct {
	ID          int      `json:"id"`
	Text        string   `json:"text"`
	Translation string   `json:"translation"`
	Audio       string   `json:"audio"`
	Tags        []string `json:"tags"`
}

func GetRandomSentence(level string) (*Sentence, error) {
	path := filepath.Join("content", "curriculum", level, "sentences.json")

	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("could not open %s: %w", path, err)
	}
	defer file.Close()

	var sentences []Sentence
	bytes, _ := io.ReadAll(file)
	json.Unmarshal(bytes, &sentences)

	if len(sentences) == 0 {
		return nil, fmt.Errorf("no sentences found for level %s", level)
	}

	rand.New(rand.NewSource(time.Now().UnixNano()))
	random := rand.Intn(len(sentences))

	return &sentences[random], nil
}
