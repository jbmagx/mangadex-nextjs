export function checkVolumeCompleteness(chapters: string[]): VolumeCheckResult {
    // Convert "Chapter X" into numeric values
    let chapterNumbers: number[] = chapters.map((ch) => parseFloat(ch.replace('Chapter ', '')));

    // Sort chapters numerically
    chapterNumbers.sort((a, b) => a - b);

    let uniqueWholeChapters = new Set<number>(); // Store unique whole number chapters
    let allWholeChapters: number[] = []; // Sorted list of all whole-number chapters found

    // Add whole number chapters to the set
    chapterNumbers.forEach((ch) => {
        let wholeNumber = Math.floor(ch);
        uniqueWholeChapters.add(wholeNumber);
        if (!allWholeChapters.includes(wholeNumber)) {
            allWholeChapters.push(wholeNumber);
        }
    });

    // Sort whole-number chapters
    allWholeChapters.sort((a, b) => a - b);

    let isComplete = true;
    let missingChapters: number[] = [];

    // Identify missing whole-number chapters
    for (let i = 1; i < allWholeChapters.length; i++) {
        let expectedNext = allWholeChapters[i - 1] + 1;
        if (allWholeChapters[i] !== expectedNext) {
            for (let missing = expectedNext; missing < allWholeChapters[i]; missing++) {
                missingChapters.push(missing);
            }
            isComplete = false;
        }
    }

    // Expected total chapter count = real count + number of missing whole chapters
    let expectedChapterCount = chapterNumbers.length + missingChapters.length;

    return {
        isComplete,
        chapterCount: chapterNumbers.length, // Total including decimal chapters
        realChapterCount: uniqueWholeChapters.size, // Only whole number chapters
        expectedChapterCount, // The expected full count, including float chapters
        missingChapters,
    };
}

// function checkVolumeCompleteness(chapters: string[]): VolumeCheckResult {
//     // Convert "Chapter X" into numeric values
//     let chapterNumbers: number[] = chapters.map((ch) => parseFloat(ch.replace('Chapter ', '')));

//     // Sort chapter numbers
//     chapterNumbers.sort((a, b) => a - b);

//     let uniqueWholeChapters = new Set<number>(); // Store unique whole number chapters

//     // Add whole number chapters to the set
//     chapterNumbers.forEach((ch) => uniqueWholeChapters.add(Math.floor(ch)));

//     // Convert set back to sorted array
//     let sortedWholeChapters = Array.from(uniqueWholeChapters).sort((a, b) => a - b);

//     let isComplete = true;

//     // Check if all whole number chapters are consecutive
//     for (let i = 1; i < sortedWholeChapters.length; i++) {
//         if (sortedWholeChapters[i] !== sortedWholeChapters[i - 1] + 1) {
//             isComplete = false;
//             break;
//         }
//     }

//     return {
//         isComplete,
//         chapterCount: chapterNumbers.length, // Total including decimal chapters
//         realChapterCount: uniqueWholeChapters.size, // Only whole number chapters
//     };
// }
