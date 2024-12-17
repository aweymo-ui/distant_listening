var store = [ 
    
    
    { 
        "url": "/content/1_background.html",
        "title": "Background",
        "text": "The University of Idaho’s Digital Scholarship and Open Strategies (DSOS) department was established in 2008 to digitize the International Jazz Collection and has since expanded to over 130 digital collections.[1] These collections are constructed with CollectionBuilder, an “open source framework for creating digital collections and exhibit websites that are driven by metadata and modern static web technology”. A companion framework named Oral History as Data (OHD) was developed in 2016 to visualize encoded transcriptions and allow researchers to explore oral history recordings by keywords and tags. In this paper, “tagging” refers to a custom set of subject designations that can be tailored by the transcriber depending on the recording’s content and themes. CollectionBuilder browse site and CollectionBuilder template interface. Our physical workspace at the library is the Center for Digital Inquiry and Learning (CDIL), where our Digital Labs Manager, Digital Project Manager and I support the labor of a small group of student workers and fellowship recipients, generally around 2-5 a semester. Both the CollectionBuilder and OHD frameworks have been designed to be completely open source, only requiring someone with access to Google Sheets, Visual Studio Code and minimal software installation to create, maintain and export digital collections. Oral History as Data tagging interface with tags and how they are visualized within two recordings below. The incentive for this project arose from realizing a number of oral history recordings were either untranscribed, partially transcribed or lacking in accuracy following a data migration of our digital collections away from ContentDM in the winter of 2023. Because of the volume of text that needed updating, it was worthwhile to rethink workflows for overall efficiency and accuracy of this project. This case study details my experience over the last six months developing the tools independently and collaborating with one undergraduate fellowship recipient and one graduate student working as transcribers, incorporating their feedback and streamlining processes."
    },
    { 
        "url": "/content/2_challenges.html",
        "title": "Challenges",
        "text": "The time-intensive nature of transcription has made many oral history collections an undervalued format in digital initiatives. Meeting accessibility standards involves not only transcribing recordings but also presenting them in an intuitive, navigable digital interface. OHD developer Devin Becker’s solution displays the audio at the top of the page, followed by a visualization of the entire recording displaying the colored tags, a key to the tags, a search bar for keyword queries and the transcription below. This allows researchers to follow along with the timestamped transcript as the audio plays. Oral History as Data tagging interface and keyword searching functionality. Despite advancements in the oral history player interface, the primary hurdle in developing these collections has been the initial transcription process. Since OHD’s development in 2016, machine learning speech detection abilities have improved considerably. However, earlier free options were either so poor that they were negligible to working from scratch, or they were prohibitively expensive for a higher education institution. Completely human driven transcription has its own challenges: it’s tedious, slow moving work that, without close supervision, can result in uncontrolled vocabulary, knowledge gaps, and biases from linear listening. Challenges of Linear Listening Visualization Linear listening, or creating tags by listening to an oral history collection from beginning to end, may mislead transcribers by establishing repeating themes that don’t occur across the collection or missing themes that only begin to appear in later recordings. The name of this presentation, distant listening, is an alternate approach which text mines combined transcripts and generates tags before the student worker begins the copy editing process, with the goal of producing richer, more accurate data, ultimately allowing researchers to identify more connections across entire oral history collections."
    },
    { 
        "url": "/content/3_process.html",
        "title": "Process",
        "text": "Contents: Overview | Transcription | Python Text Mining | Apps Script Connection and Customization Workflow Visualization Overview To summarize the process: Audio is transcribed into CSV files by Premiere CSVs are made into individual Google Sheets and also added to the Python Transcription Mining Tool Within the tool, these items are combined and searched for all associated words and phrases built into the tool under different tag categories The tool generates a tally of the these words and phrases, which is used to create the “Primary Tag Sheet” in another Google Sheet Using the Apps Script function, all individual transcripts are linked to the primary tag sheet so their tag fields are automatically generated New categories or associated words can be added or removed to the Primary Tag Sheet and these changes can be implemented across all individual transcripts by simply re-running the code Individual changes can be implemented during the student worker led copy editing process to catch any data driven errors &#10042; Transcription Moving away from the speech to text tools the department had been working with, I tested Adobe Premiere’s transcription tools and found it uniquely well-suited for the OHD framework, with advantages including: Dramatically increased accuracy in differentiating speakers and transcribing dialogue, even with obscure and regional proper nouns. Significantly faster transcription speed, from one 1.5-hour recording every two to three business days up to twenty 1.5-hour recordings in one day. Costs covered by our university-wide Adobe subscription. Direct export to CSV UTF-8 needed for OHD, avoiding conversion errors. Free non-English language packs, enabling the creation of the department’s first Spanish and French language oral history collections. High privacy standards with Premiere’s GDPR compliance, ensuring all transcription material is stored locally and not uploaded to the cloud.[2] Example of transcript CSV formatting as it exports from Adobe Premiere That said, the tool is not perfect. While modern recordings in good conditions have extremely high transcription accuracy, poor quality recordings and interviews between two similar sounding people can require significant copyediting. While some negative perspectives of speech to text tools have to do with bias built into machine learning (Link, 2020), others stem from academic double standards expecting written transcripts to be an improved version of the audio rather than a reflection of it. Some of these notions may have origins in the earliest American academic oral history transcription standards of Columbia University, where editors were encouraged to delete “false starts”, audit wording, rearrange passages into topical or chronological order or delete whole sections to transform the transcript from “what might be dismissed as hearsay into a document that has much the standing of legal disposition”, essentially divorcing the transcript from the audio.(Freund, 2024) Since then, critics of this practice of “cleaning up” spoken language have emerged, pointing out how it introduces unnecessary editorial bias. As University of Kentucky’s Susan Emily Allen notes in Resisting the Editorial Ego: Editing Oral History: \"These texts take it upon themselves to glean 'what words are meaningful.' Meaningful for whom? For the editor? Such subjectivism is not only rather irresponsible scholarship but, however well-intentioned, an attempt to legislate truth.\" (Allen, 1982) &#10042; Python Text Mining After using the web based text mining tool Voyant while developing subject tags for the Taylor Wilderness Research Station digital collection, I wanted to create a text mining tool from scratch using Python. This would allow the targeting of specific words and phrases, create custom tagging categories and “stopwords” (words removed from text before processing and analysis) for each collection. Once the CSVs of the transcript are added to a folder in the Python workspace, the code begins with importing Pandas library for data manipulation, the Natural Language Toolkit and TextBlob for language processing and sentiment analysis. Additionally, Regular Expressions and the ‘collections.Counter’ function are added for text mining and tallying results. Next, the ‘preprocess_text’ function removes words of four characters or fewer, eliminates punctuation, and converts all text to lowercase. CSV file paths are constructed, and the text data is concatenated into a single string corpus. Stopwords are removed, word frequency is counted and the 100 most frequent words are generated when the code is run. Below this header material in the Python file are three text mining categories: General: agriculture, animals, clothing, etc. Geographic (based loosely on migration statistics from the 1910 Idaho census[3]): britain, canada, china, etc. Custom (example from our Rural Women’s History Project): Marriage and Divorce, Motherhood, Reproductive Rights, etc. Each of these sections have a list of fifty associated words and phrases that the script is searching for within the combined transcription corpus. These were generated using Chatgpt with the following qualifications: The word or phrase is only associated with one section. For example, regarding the sections agriculture and animals, the word “pasture” would be excluded since it could refer to both the land used for grazing animals and also the act of animals engaged in land management. Exclude homographs (words that are spelled the same but have different meanings). For example, sow refers both to an adult female pig and the agricultural act of planting seeds in the ground. Place names and how certain nationalities would refer to themselves for the geographic sections. For example, “Philippines”, “Filipino”, “Tagalog…”, “Norwegian”, “Norway”, “Oslo…” or “Japanese”, “Japan”, “Tokyo”, etc. These text mining categories and sections produce a total of 2,250 associated words phrases that are being identified across the combined transcript corpus before the script tallies these words to generate the output shown below: Example of Text Mining Tool Output for the Rural Women's History Project Future iterations of this repository will modularize the General, Geographic and Custom sections for easier navigation instead of its current form as a single, expansive Python file. See Appendix 1 for an excerpt of this script or visit the Git to view in full. Apps Script Connection and Customization Once this text mining data is produced, it can be copied and pasted into a “primary tag sheet” in Google Sheets, located in the same folder as the transcripts for student workers to access and edit. Using the Text to Columns function, tag names are split into column A and their associated words into column B. Excerpt of a formatted primary tags sheet, utilizing the Rural Women's History Project text mining tool output After making some minor adjustments to the individual transcript that has been generated using Premiere necessary for the Oral History as Data framework, student workers access the Apps Script extension located in the drop down menu. Transcribers then enter the code (see Appendix 2), and make two minor adjustments: Change the sheet name of the transcript they are editing on line 6 Change the URL of their primary tag sheet on line 13, then save and run the code. Now the individual transcript is connected to the Primary Tag Sheet, which will automatically search the text column for these associated words and fill in the tag column of the transcript with that section. &#10042; It’s important to state that this process is not intended to replace human transcribers but shifts the focus from manual tagging to copy editing, reducing heavy lifting and repetition. If transcribers notice that a tag is either not applicable or missing from the Primary Tag Sheet, they are encouraged to make these additions or subtractions and rerun the Apps Script on their individual transcripts, which will automatically make these adjustments. If transcribers notice errors that are more specific to individual sections of dialogue, they can paste it into the additions or subtractions column so these changes aren’t replaced by future runs of the Apps Script and reflected in the final copyedited version that is implemented in the digital collection."
    },
    { 
        "url": "/content/4_findings.html",
        "title": "Findings",
        "text": "Fig. 1: Pre and Post Text Mining Process Tag Visualization While testing this process with two transcribers over the summer of 2024, two of my main concerns were: Would find the Apps Script coding element confusing and/or anxiety-inducing? Would the automated tagging generate a lot of inappropriate tags that would make correcting these items a drag on productivity? At least with this small sample group, these factors weren’t an issue. Possibly helpful in this effort was weekly meetings where we checked in and tested the code, sometimes purposefully breaking it to show how those mistakes can be easily fixed and demonstrate how they can update the Primary Tags Sheet and rerun the code on their transcript sheets to quickly make changes. Rather than simply asking student workers to transcribe recordings—work that offers little to highlight on a CV and can lead to burnout and high turnover—this process allows transcribers to engage in coding, create and modify tags, and see those changes reflected instantly through the Apps Script process. In addition to helping us meet our department’s accessibility standards, this process enabled us to complete our first non-English oral history collection in the form of the Hispanic Oral History Project, an initiative from 1991 copyedited by student worker Daniel Olortegui Vargas. This work in progress will be using this material to enhance the OHD item-level interface, allowing listeners to toggle between English and Non-English transcriptions. This new feature in the open-source OHD framework aims to promote the digitization of more diverse oral history collections both within and beyond the institution. From what I can gather, this approach has generated a significant increase in both the volume, accuracy and detail of oral history transcription work from the previous summer’s efforts. In addition to the tools discussed in this article, other factors contributing to this progress include: A more dynamic, interactive workflow leading to greater transcriber productivity Less repetitive labeling and formatting work hopefully leading to increased output and student worker retention Supplementary documentation helping transcribers navigate the more technical aspects of the workflow All tags use a controlled vocabulary necessary for the OHD framework Tagging is more accurate, detailed, and relevant, helping future researchers quickly identify thematic connections Tagging establishes a knowledge framework relevant to the collection that transcribers may lack in historical, scientific, or regional contexts key to the recordings &#10042; Regarding the limitations of data-driven, human-edited automated tagging, program managers must communicate that automated tags are only a starting point. Tags may be incorrectly applied, missing or need to be applied more broadly to transcripts. Even when these measures are taken, the amount of detail this process accrues is drastic and easily distinguishable in the OHD tagging visualization (fig. 1). One could argue that the density of the data now makes it difficult for the researcher to navigate, especially on mobile devices. This continues to be a dialogue as we refine these processes. &#10042; Conclusion While discussing grant funding for digital initiatives, a colleague pointed out that the time-intensive nature of oral history projects often leads to their neglect. As they put it: “Would you rather present ten oral history recordings or 500 photographs?” This quantity-focused selection criteria ultimately poses an existential threat, leaving these materials physically vulnerable as they languish in the archives. Bicentennial and community oral history initiatives, rich in non-academic perspective, offer a uniquely biographical account of places and provide valuable contrast and context to the accepted historical record. By utilizing machine learning, Python, and JavaScript approaches, this process seeks to make digitizing these resources more efficient and accessible, promoting their preservation and availability to the public."
    },
    { 
        "url": "/content/5_references_apendices.html",
        "title": null,
        "text": "Contents: References | Notes | Appendices | Appendix 1. Excerpt of Python Text Mining Tool | Appendix 2. Apps Script Example for Linking Transcript to Primary Tag Sheet | About the Author &#10042; References Link J. Why Racial Bias Still Haunts Speech-Recognition AI. Built In; 2020 [cited 2024 Jul 8]. Available from: https://builtin.com/artificial-intelligence/racial-bias-speech-recognition-systems Freund A. From.wav to.txt: why we still need transcripts in the digital age. Internet. 2024. [cited 2024 Jul 8]. Allen SE. Resisting the editorial ego: editing oral history. Oral Hist Rev. 1982;10(1):33-45. DOI 10.1093/ohr/10.1.33. [cited 2024 Jul 8]. Available from: https://www.tandfonline.com/doi/full/10.1093/ohr/10.1.33 Notes [1] Digital Collections, University of Idaho. University of Idaho Library Digital Initiatives; 2024 [cited 2024 Jul 8]. Available from: https://www.lib.uidaho.edu/digital/collections.html [2] Speech to Text in Premiere Pro FAQ. Adobe; [cited 2024 Jul 8]. Available from: https://helpx.adobe.com/content/help/en/premiere-pro/using/speech-to-text-faq.html [3] Department of Commerce and Labor, Bureau of Statistics. Thirteenth Census of the United States: 1910. Statistics for Idaho. Washington (DC): Government Printing Office; 1913. [cited 2024 Jul 8]. Available from: https://www2.census.gov/library/publications/decennial/1910/abstract/statistics-for-idaho.pdf Appendices Appendix 1. Excerpt of Python Text Mining Tool import pandas as pd import string from nltk.corpus import stopwords from collections import Counter import re from textblob import TextBlob Download NLTK stopwords data import nltk nltk.download('stopwords') Define preprocess_text function def preprocess_text(text): if isinstance(text, str): # Check if text is a string text = re.sub(r'\\b\\w{1,4}\\b', '', text) # Remove short words (length &lt;= 4) text = text.translate(str.maketrans('', '', string.punctuation)) text = text.lower() # Convert text to lowercase else: text = '' # Replace NaNs with an empty string return text Load stopwords for both Spanish and English stop_words_spanish = set(stopwords.words('spanish')) stop_words_english = set(stopwords.words('english')) Combine both sets of stopwords stop_words = stop_words_spanish.union(stop_words_english) import os Directory containing CSV files directory = 'C:\\\\Users\\\\aweymouth\\\\Documents\\\\Github\\\\transcript_mining_base\\\\CSV' List of CSV file names file_names = [ 'rwhp070.csv', 'rwhp075.csv', 'rwhp079.csv', 'rwhp083.csv', 'rwhp088.csv', 'rwhp109.csv', 'rwhp123.csv', 'rwhp174.csv', 'rwhp225.csv', 'rwhp261.csv', 'rwhp277.csv', 'rwhp277.csv', 'rwhp297.csv', 'rwhp320.csv', 'rwhp323.csv', 'rwhp378.csv', 'rwhp385.csv', 'rwhp410.csv', 'rwhp418.csv', 'rwhp420.csv', 'rwhp421.csv', 'rwhp422.csv', 'rwhp425.csv', 'rwhp426.csv', 'rwhp427.csv' ] Construct file paths using os.path.join() file_paths = [os.path.join(directory, file_name) for file_name in file_names] dfs = [pd.read_csv(file_path, encoding='utf-8') for file_path in file_paths] Concatenate text data from all dataframes into a single corpus corpus = '' for df in dfs: text_series = df['text'].fillna('').astype(str).str.lower().str.strip() # Extract and preprocess text column corpus += ' '.join(text_series) + ' ' # Concatenate preprocessed text with space delimiter Preprocess the entire corpus cleaned_corpus = preprocess_text(corpus) Remove stopwords from the corpus filtered_words = [word for word in cleaned_corpus.split() if word not in stop_words and len(word) &gt;= 5] Count the frequency of each word word_freq = Counter(filtered_words) Get top 100 most frequent distinctive words with occurrences top_distinctive_words = word_freq.most_common(100) === General Section === from collections import Counter import re def find_agriculture_terms(corpus): # Define a list of agriculture-related terms agriculture_terms = [\"harvest\", \"tractor\", \"acreage\", \"crop\", \"livestock\", \"farm field\", \"barn building\", \"ranch\", \"garden\", \"orchard\", \"dairy\", \"cattle\", \"poultry\", \"equipment\", \"fertilizer\", \"seed\", \"irrigation\", \"plow\", \"farmhand\", \"hoe\", \"shovel\", \"milking\", \"hay\", \"silage\", \"compost\", \"weeding\", \"crop rotation\", \"organic\", \"gmo\", \"sustainable\", \"farming\", \"rural\", \"homestead\", \"tilling\", \"wheat\", \"corn maize\", \"soybean\", \"potato\", \"apple fruit\", \"berry\", \"honey\", \"apiary\", \"pasture\", \"combine harvester\", \"trailer\", \"baler\", \"thresher\"] # Initialize a Counter to tally occurrences of agriculture-related terms agriculture_word_freq = Counter() # Tokenize the corpus to handle multi-word expressions tokens = re.findall(r'\\b\\w+\\b', corpus.lower()) # Iterate over each token in the corpus for word in tokens: # Check if the token is an agriculture-related term if word in agriculture_terms: agriculture_word_freq[word] += 1 # Return the top 50 most common agriculture-related terms return agriculture_word_freq.most_common(50) Call the function to find agriculture-related terms in the corpus top_agriculture_terms = find_agriculture_terms(corpus) Print the top 50 agriculture-related terms print(\"## agriculture\") for word, count in top_agriculture_terms: print(f\"{word.capitalize()}: {count}\") Appendix 2. Apps Script Example for Linking Transcript to Primary Tag Sheet function fillTags() { // Get the active spreadsheet var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Get the transcript sheet by name var transcriptSheet = spreadsheet.getSheetByName(\"Callison3\"); if (!transcriptSheet) { Logger.log(\"Transcript sheet not found\"); return; } // Set the header in cell E1 to \"tags\" transcriptSheet.getRange(\"E1\").setValue(\"tags\"); // Get the tags spreadsheet by URL var tagsSpreadsheet = SpreadsheetApp.openByUrl(\"https://docs.google.com/spreadsheets/d/1soOfgdAjik_TL8WX9dDV9BaFb1RQJc8_BVu7sBGnNUE/edit?gid=419710039#gid=419710039\"); if (!tagsSpreadsheet) { Logger.log(\"Tags spreadsheet not found\"); return; } // Get the tags sheet within the tags spreadsheet var tagsSheet = tagsSpreadsheet.getSheetByName(\"tags\"); if (!tagsSheet) { Logger.log(\"Tags sheet not found\"); return; } // Get the range of the transcript column var transcriptRange = transcriptSheet.getRange(\"D2:D\" + transcriptSheet.getLastRow()); var transcriptValues = transcriptRange.getValues(); // Get the range of example words and tags in the tags sheet var exampleWordsRange = tagsSheet.getRange(\"B2:B\" + tagsSheet.getLastRow()); var tagsRange = tagsSheet.getRange(\"A2:A\" + tagsSheet.getLastRow()); var exampleWordsValues = exampleWordsRange.getValues(); var tagsValues = tagsRange.getValues(); // Create a map of example words to tags var tagsMap = {}; for (var i = 0; i &lt; exampleWordsValues.length; i++) { var word = exampleWordsValues[i][0].toLowerCase(); var tag = tagsValues[i][0]; tagsMap[word] = tag; } // Initialize an array to store the tags for each transcript entry var transcriptTags = []; // Loop through each transcript entry for (var i = 0; i &lt; transcriptValues.length; i++) { var text = transcriptValues[i][0]; var uniqueTags = []; if (typeof text === 'string') { // Use regular expression to extract words and handle punctuation var words = text.match(/\\b\\w+['-]?\\w*|\\w+['-]?\\w*\\b/g); // Check each word in the transcript entry against the tags map if (words) { for (var j = 0; j &lt; words.length; j++) { var word = words[j].toLowerCase().replace(/[.,!?;:()]/g, ''); var singularWord = word.endsWith('s') ? word.slice(0, -1) : word; if (tagsMap.hasOwnProperty(word) &amp;&amp; !uniqueTags.includes(tagsMap[word])) { uniqueTags.push(tagsMap[word]); } else if (tagsMap.hasOwnProperty(singularWord) &amp;&amp; !uniqueTags.includes(tagsMap[singularWord])) { uniqueTags.push(tagsMap[singularWord]); } } } } // Add the determined tags to the array transcriptTags.push([uniqueTags.join(\";\")]); } // Get the range of the tags column in the transcript sheet, starting from E2 var tagsColumn = transcriptSheet.getRange(\"E2:E\" + (transcriptTags.length + 1)); // Set the values in the tags column to the determined tags tagsColumn.setValues(transcriptTags); } About the Author Andrew Weymouth is the Digital Initiatives Librarian at University of Idaho, specializing in static web design to curate the institution’s special collections and partner with faculty and students on fellowship projects. His work spans digital scholarship projects at the universities of Oregon and Washington and the Tacoma Northwest Room archives, including long form audio public history projects, architectural databases, oral history and network visualizations. He writes about labor, architecture, underrepresented communities and using digital methods to survey equity in archival collections."
    },
    { 
        "url": "/",
        "title": "Home",
        "text": "Abstract This article will provide a case study of new processes for creating subject tags across complete oral history collections. It outlines a workflow that empowers student workers to run, modify, and expand these tags during the copyediting process. The goal is to produce richer, more accurate tagging, allowing researchers to more easily identify connections across audio collections. The paper provides a detailed description of the workflow, explores the challenges it addresses, shares pedagogical experiences of transcribers, and examines the limitations of data-driven, human-edited automated tagging. Contents: Background Challenges Process Findings References and Appendices Content: CC BY-NC-ND 4.0 Andrew Weymouth 2024 (get source code). Theme: Variation on workshop-template-b by evanwill"
    }];
