// ==========================================
// STUDYVAULT V1
// ==========================================

// ELEMENTS

const addFolderBtn =
    document.getElementById("addFolderBtn");

const addNoteBtn =
    document.getElementById("addNoteBtn");

const saveNoteBtn =
    document.getElementById("saveNoteBtn");

const themeBtn =
    document.getElementById("themeBtn");

const folderList =
    document.getElementById("folderList");

const notesList =
    document.getElementById("notesList");

const noteTitle =
    document.getElementById("noteTitle");

const noteContent =
    document.getElementById("noteContent");

const searchInput =
    document.getElementById("searchInput");

const folderCount =
    document.getElementById("folderCount");

const noteCount =
    document.getElementById("noteCount");

const currentFolderTitle =
    document.getElementById(
        "currentFolderTitle"
    );

const noteSubtitle =
    document.getElementById(
        "noteSubtitle"
    );

const saveStatus =
    document.getElementById(
        "saveStatus"
    );


// ==========================================
// DATA
// ==========================================

// IMPORTANT:
// These are the ORIGINAL storage keys.
// Existing data will remain.

let folders =
    JSON.parse(
        localStorage.getItem("folders")
    ) || [];


let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];


let currentFolder = null;

let currentNoteId = null;


// ==========================================
// STORAGE
// ==========================================

function saveFolders() {

    localStorage.setItem(
        "folders",
        JSON.stringify(folders)
    );
}


function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    folderCount.textContent =
        folders.length;


    noteCount.textContent =
        notes.length;
}


// ==========================================
// FOLDERS
// ==========================================

function displayFolders() {

    folderList.innerHTML = "";


    folders.forEach(function(folder) {

        const item =
            document.createElement("div");


        item.className =
            "folder-item";


        const name =
            document.createElement("span");


        name.className =
            "folder-name";


        name.textContent =
            "📁 " + folder;


        name.addEventListener(
            "click",
            function() {

                selectFolder(folder);

            }
        );


        const options =
            document.createElement("button");


        options.className =
            "folder-options";


        options.textContent =
            "⋮";


        options.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                folderOptions(folder);

            }
        );


        item.appendChild(name);

        item.appendChild(options);

        folderList.appendChild(item);
    });


    updateDashboard();
}


// ==========================================
// SELECT FOLDER
// ==========================================

function selectFolder(folder) {

    currentFolder =
        folder;


    currentNoteId =
        null;


    searchInput.value =
        "";


    noteTitle.value =
        "";


    noteContent.innerHTML =
        "";


    currentFolderTitle.textContent =
        folder;


    noteSubtitle.textContent =
        "Your notes in " +
        folder;


    displayNotes();
}


// ==========================================
// NEW FOLDER
// ==========================================

addFolderBtn.addEventListener(
    "click",
    function() {

        const name =
            prompt(
                "Enter folder name:"
            );


        if (!name) {
            return;
        }


        const clean =
            name.trim();


        if (!clean) {
            return;
        }


        if (
            folders.includes(clean)
        ) {

            alert(
                "That folder already exists."
            );

            return;
        }


        folders.push(clean);


        saveFolders();


        displayFolders();


        selectFolder(clean);
    }
);


// ==========================================
// FOLDER OPTIONS
// ==========================================

function folderOptions(folder) {

    const choice =
        prompt(
            "Type R to rename or D to delete:"
        );


    if (!choice) {
        return;
    }


    if (
        choice.toLowerCase() ===
        "r"
    ) {

        renameFolder(folder);

    }


    if (
        choice.toLowerCase() ===
        "d"
    ) {

        deleteFolder(folder);

    }
}


// ==========================================
// RENAME FOLDER
// ==========================================

function renameFolder(oldName) {

    const newName =
        prompt(
            "Enter the new folder name:"
        );


    if (!newName) {
        return;
    }


    const clean =
        newName.trim();


    if (!clean) {
        return;
    }


    if (
        folders.includes(clean)
    ) {

        alert(
            "That folder already exists."
        );

        return;
    }


    const index =
        folders.indexOf(oldName);


    folders[index] =
        clean;


    notes.forEach(function(note) {

        if (
            note.folder ===
            oldName
        ) {

            note.folder =
                clean;
        }
    });


    if (
        currentFolder ===
        oldName
    ) {

        currentFolder =
            clean;
    }


    saveFolders();

    saveNotes();

    displayFolders();

    displayNotes();
}


// ==========================================
// DELETE FOLDER
// ==========================================

function deleteFolder(folder) {

    const folderNotes =
        notes.filter(function(note) {

            return (
                note.folder ===
                folder
            );

        });


    if (
        folderNotes.length > 0
    ) {

        alert(
            "Delete the notes inside this folder first."
        );

        return;
    }


    if (
        !confirm(
            "Delete '" +
            folder +
            "'?"
        )
    ) {

        return;
    }


    folders =
        folders.filter(function(item) {

            return item !== folder;

        });


    saveFolders();


    if (
        currentFolder ===
        folder
    ) {

        currentFolder =
            null;

        currentNoteId =
            null;

        noteTitle.value =
            "";

        noteContent.innerHTML =
            "";

        currentFolderTitle.textContent =
            "My Notes";

        noteSubtitle.textContent =
            "Select a folder to begin.";
    }


    displayFolders();

    displayNotes();
}


// ==========================================
// DISPLAY NOTES
// ==========================================

function displayNotes() {

    notesList.innerHTML = "";


    if (!currentFolder) {

        notesList.innerHTML = `
            <div class="empty-state">
                <strong>📚 Welcome to StudyVault</strong>
                Select a folder to see your notes.
            </div>
        `;

        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let folderNotes =
        notes.filter(function(note) {

            return (
                note.folder ===
                currentFolder
            );

        });


    // SEARCH

    if (search) {

        folderNotes =
            folderNotes.filter(
                function(note) {

                    const title =
                        String(
                            note.title ||
                            ""
                        ).toLowerCase();


                    const temp =
                        document.createElement(
                            "div"
                        );


                    temp.innerHTML =
                        note.content ||
                        "";


                    const content =
                        temp.textContent
                            .toLowerCase();


                    return (
                        title.includes(search) ||
                        content.includes(search)
                    );

                }
            );
    }


    // PINNED FIRST

    folderNotes.sort(
        function(a, b) {

            return (
                Number(
                    Boolean(b.pinned)
                ) -
                Number(
                    Boolean(a.pinned)
                )
            );

        }
    );


    if (
        folderNotes.length ===
        0
    ) {

        notesList.innerHTML = `
            <div class="empty-state">
                <strong>📝 No notes found</strong>
                ${
                    search
                        ? "Try another search."
                        : "Create your first note."
                }
            </div>
        `;

        return;
    }


    folderNotes.forEach(
        function(note) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "note-card";


            if (note.pinned) {

                card.classList.add(
                    "pinned"
                );
            }


            // TITLE

            const title =
                document.createElement(
                    "div"
                );


            title.className =
                "note-card-title";


            title.textContent =
                (
                    note.pinned
                        ? "📌 "
                        : "📝 "
                ) +
                (
                    note.title ||
                    "Untitled Note"
                );


            // PREVIEW

            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "note-preview";


            const temp =
                document.createElement(
                    "div"
                );


            temp.innerHTML =
                note.content ||
                "";


            const plainText =
                temp.textContent
                    .trim();


            preview.textContent =
                plainText ||
                "Empty note";


            // TIME

            const time =
                document.createElement(
                    "div"
                );


            time.className =
                "note-time";


            time.textContent =
                formatTime(
                    note.updatedAt
                );


            // ACTIONS

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "note-actions";


            // PIN

            const pin =
                document.createElement(
                    "button"
                );


            pin.className =
                "pin-btn";


            if (note.pinned) {

                pin.classList.add(
                    "pinned"
                );

                pin.textContent =
                    "📌";

            } else {

                pin.textContent =
                    "📍";
            }


            pin.title =
                note.pinned
                    ? "Unpin note"
                    : "Pin note";


            pin.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    togglePin(note.id);

                }
            );


            // DELETE

            const del =
                document.createElement(
                    "button"
                );


            del.className =
                "delete-btn";


            del.textContent =
                "🗑️";


            del.title =
                "Delete note";


            del.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    deleteNote(note.id);

                }
            );


            actions.appendChild(pin);

            actions.appendChild(del);


            // CARD

            card.appendChild(
                title
            );

            card.appendChild(
                preview
            );

            card.appendChild(
                time
            );

            card.appendChild(
                actions
            );


            card.addEventListener(
                "click",
                function() {

                    openNote(note.id);

                }
            );


            notesList.appendChild(
                card
            );
        }
    );
}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(timestamp) {

    if (!timestamp) {

        return "No date";
    }


    const date =
        new Date(timestamp);


    return (
        "Edited " +
        date.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short"
            }
        ) +
        " at " +
        date.toLocaleTimeString(
            undefined,
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );
}


// ==========================================
// NEW NOTE
// ==========================================

addNoteBtn.addEventListener(
    "click",
    function() {

        if (!currentFolder) {

            alert(
                "Please select a folder first."
            );

            return;
        }


        searchInput.value =
            "";


        const now =
            Date.now();


        const note = {

            id: now,

            title:
                "Untitled Note",

            content:
                "",

            folder:
                currentFolder,

            pinned:
                false,

            updatedAt:
                now
        };


        notes.push(note);


        saveNotes();


        displayNotes();


        openNote(
            note.id
        );


        noteTitle.focus();
    }
);


// ==========================================
// OPEN NOTE
// ==========================================

function openNote(id) {

    const note =
        notes.find(function(note) {

            return note.id === id;

        });


    if (!note) {
        return;
    }


    currentNoteId =
        note.id;


    currentFolder =
        note.folder;


    currentFolderTitle.textContent =
        currentFolder;


    noteSubtitle.textContent =
        "Editing " +
        (
            note.title ||
            "Untitled Note"
        );


    noteTitle.value =
        note.title ||
        "";


    noteContent.innerHTML =
        note.content ||
        "";


    localStorage.setItem(
        "studyvault_last_note",
        String(note.id)
    );


    saveStatus.textContent =
        "Saved";


    const search =
        searchInput.value.trim();


    if (search) {

        highlightInsideEditor(
            search
        );
    }
}


// ==========================================
// SAVE NOTE
// ==========================================

function saveCurrentNote() {

    if (
        currentNoteId ===
        null
    ) {

        return;
    }


    const note =
        notes.find(function(note) {

            return (
                note.id ===
                currentNoteId
            );

        });


    if (!note) {
        return;
    }


    removeSearchHighlights();


    note.title =
        noteTitle.value.trim() ||
        "Untitled Note";


    note.content =
        noteContent.innerHTML;


    note.updatedAt =
        Date.now();


    saveNotes();


    displayNotes();


    noteSubtitle.textContent =
        "Editing " +
        note.title;


    saveStatus.textContent =
        "Saved just now";


    const search =
        searchInput.value.trim();


    if (search) {

        highlightInsideEditor(
            search
        );
    }
}


// ==========================================
// SAVE BUTTON
// ==========================================

saveNoteBtn.addEventListener(
    "click",
    function() {

        saveCurrentNote();

    }
);


// ==========================================
// AUTOSAVE
// ==========================================

noteTitle.addEventListener(
    "input",
    function() {

        saveCurrentNote();

    }
);


noteContent.addEventListener(
    "input",
    function() {

        saveCurrentNote();

    }
);


// ==========================================
// PIN NOTE
// ==========================================

function togglePin(id) {

    const note =
        notes.find(function(note) {

            return note.id === id;

        });


    if (!note) {
        return;
    }


    note.pinned =
        !note.pinned;


    note.updatedAt =
        Date.now();


    saveNotes();


    displayNotes();
}


// ==========================================
// DELETE NOTE
// ==========================================

function deleteNote(id) {

    if (
        !confirm(
            "Delete this note?"
        )
    ) {

        return;
    }


    notes =
        notes.filter(function(note) {

            return note.id !== id;

        });


    saveNotes();


    if (
        currentNoteId === id
    ) {

        currentNoteId =
            null;

        noteTitle.value =
            "";

        noteContent.innerHTML =
            "";

        saveStatus.textContent =
            "Ready";

        localStorage.removeItem(
            "studyvault_last_note"
        );
    }


    displayNotes();

    updateDashboard();
}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function() {

        displayNotes();


        if (
            currentNoteId !== null
        ) {

            removeSearchHighlights();


            const term =
                searchInput.value.trim();


            if (term) {

                highlightInsideEditor(
                    term
                );
            }
        }
    }
);


// ==========================================
// HIGHLIGHT SEARCH
// ==========================================

function highlightInsideEditor(
    searchTerm
) {

    if (!searchTerm) {
        return;
    }


    removeSearchHighlights();


    const walker =
        document.createTreeWalker(
            noteContent,
            NodeFilter.SHOW_TEXT
        );


    const nodes = [];


    while (
        walker.nextNode()
    ) {

        nodes.push(
            walker.currentNode
        );
    }


    nodes.forEach(
        function(node) {

            const text =
                node.nodeValue;


            const lower =
                text.toLowerCase();


            const term =
                searchTerm.toLowerCase();


            if (
                !lower.includes(term)
            ) {

                return;
            }


            const fragment =
                document.createDocumentFragment();


            let position = 0;


            while (true) {

                const index =
                    lower.indexOf(
                        term,
                        position
                    );


                if (
                    index === -1
                ) {

                    fragment.appendChild(
                        document.createTextNode(
                            text.substring(
                                position
                            )
                        )
                    );

                    break;
                }


                fragment.appendChild(
                    document.createTextNode(
                        text.substring(
                            position,
                            index
                        )
                    )
                );


                const mark =
                    document.createElement(
                        "mark"
                    );


                mark.className =
                    "search-highlight";


                mark.textContent =
                    text.substring(
                        index,
                        index +
                        searchTerm.length
                    );


                fragment.appendChild(
                    mark
                );


                position =
                    index +
                    searchTerm.length;
            }


            node.parentNode.replaceChild(
                fragment,
                node
            );
        }
    );
}


// ==========================================
// REMOVE SEARCH HIGHLIGHTS
// ==========================================

function removeSearchHighlights() {

    const marks =
        noteContent.querySelectorAll(
            ".search-highlight"
        );


    marks.forEach(
        function(mark) {

            mark.replaceWith(
                document.createTextNode(
                    mark.textContent
                )
            );
        }
    );


    noteContent.normalize();
}


// ==========================================
// FORMATTING
// ==========================================

function formatText(command) {

    removeSearchHighlights();


    document.execCommand(
        command,
        false,
        null
    );


    noteContent.focus();


    saveCurrentNote();
}


// ==========================================
// MANUAL HIGHLIGHT
// ==========================================

function highlightText() {

    removeSearchHighlights();


    document.execCommand(
        "hiliteColor",
        false,
        "yellow"
    );


    noteContent.focus();


    saveCurrentNote();
}


// ==========================================
// DARK MODE
// ==========================================

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        themeBtn.textContent =
            dark
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            "studyvault_dark",
            dark
        );
    }
);


// RESTORE THEME

if (
    localStorage.getItem(
        "studyvault_dark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☀️";
}


// ==========================================
// RESTORE LAST NOTE
// ==========================================

function restoreLastNote() {

    const savedId =
        localStorage.getItem(
            "studyvault_last_note"
        );


    if (!savedId) {
        return;
    }


    const note =
        notes.find(function(note) {

            return (
                String(note.id) ===
                savedId
            );

        });


    if (!note) {
        return;
    }


    currentFolder =
        note.folder;


    currentFolderTitle.textContent =
        currentFolder;


    noteSubtitle.textContent =
        "Your notes in " +
        currentFolder;


    displayNotes();


    openNote(
        note.id
    );
}


// ==========================================
// START
// ==========================================

displayFolders();

updateDashboard();

displayNotes();

restoreLastNote();