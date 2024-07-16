---
title: Transcription and Tagging
nav: Transcription
gallery: true
---

**Another challenge of the project** was the transcription element. The oral history videos consisted of 15 interviews ranging from an hour and a half to about a half hour. The person conducting the interviews included long pauses and a lot of informal speech, indicating the footage was originally meant to be edited down, but it never was, rendering the material difficult to follow if someone is listening to the recordings linearly. The CDIL’s [Oral History as Data](https://learn-static.github.io/oral-history-as-data/) or OHD offered a solution in the form of a fully visualized transcription that could be navigated by tagging and keyword searching. 

One challenge was that this amount of material would generally take student workers about two semesters to complete with the institution’s previous transcription methods. Building off of my work with the Washington State digital encyclopedia [HistoryLink](https://historylink.org/), I experimented with a workflow implementing [Adobe Premiere’s transcription tools](https://helpx.adobe.com/premiere-pro/using/speech-to-text.html), which excelled in identifying different speakers, was more accurate than previous tools and could be exported in almost the exact CSV format we needed for OHD. The software also has the advantage of offering a variety of different [language packs](https://helpx.adobe.com/premiere-pro/using/speech-to-text.html), which we recently utilized for a Hispanic oral history collection, successfully recognizing speakers frequently jumping between Spanish and English.

<div class="symbol-container">
    <p class="symbol">&#10042;</p>
</div>

{% include gallery-figure.html img="DH_Lecture_202411.jpg" alt="Visualization of the workflow with each tool, five minutes to download, ten to process in Premiere, five minutes to format in Google Sheets and 45 minutes to copy edit in VLC." caption="Visualization of Workflow" title="Visualization of Workflow" width="100%" %}

## Workflow

**After testing a few approaches**, I was able to find a method that could transcribe an hour and a half long video in around an hour; five minutes to download, ten minutes to process in Premiere, five minutes to format the CSV in Google Sheets and, playing at 2x speed, proof the entire recording for errors in 45 minutes. This proofing and editing can be done ergonomically within Premier’s playback interface or directly into the transcript CSV in Visual Studio Code depending on the severity of the edits needed. In the case of these fifteen videos, which were high fidelity (though featuring some tricky Idaho accents) I’d estimate around a 98% accuracy in Premier's machine learning.

<div class="symbol-container">
    <p class="symbol">&#10042;</p>
</div>

{% include gallery-figure.html img="voyant.png" alt="Voyant interface with the distinctive words category mentioned in the tagging process." caption="Voyant interface with the uncleaned language and distinctive words category mentioned in the tagging process" title="Voyant interface with the uncleaned language and distinctive words category mentioned in the tagging process" width="100%" %}

## Tagging Transcripts with Text Mining

Another strength of OHD is the tagging capability, where threads can be woven through multiple interviews, revealing underlying themes. To efficiently identify tag material, I dropped all of the transcript CSVs into the freely available text mining engine [Voyant](https://voyant-tools.org/). 

{% include gallery-figure.html img="distinct_1.png" alt="List of words with various repeating themes highlighted." caption="List of words extracted from Voyant with various repeating themes highlighted" title="List of words extracted from Voyant with various repeating themes highlighted" width="100%" %}

**Normally, this type of text mining analysis would require some amount of “cleaning”** to remove all of the filler words from a document, but pulling from the “distinctive words” section of the summary can provide a similar snapshot. Copying this data from all fifteen transcriptions, I identified repeating themes, created a synonym list for those tags, searched each document for these words, and added the appropriate tag into the column next to where that dialogue appears in the transcript CSV. 

**Since working on this project**, I've developed this process, moving away from Voyant and building a text mining tool from scratch using Python with results I'm excited to write about and expand on in future work.

<div class="symbol-container">
    <p class="symbol">&#10042;</p>
</div>