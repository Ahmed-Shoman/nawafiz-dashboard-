import { useEffect, useRef } from 'react';

/**
 * Shared Rich Text Editor (Quill-based, React 19 compatible)
 * Usage: <RichTextEditor value={val} onChange={setVal} dir="rtl" />
 */
const RichTextEditor = ({ value, onChange, dir }) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        import('quill').then(({ default: Quill }) => {
            // Inject Quill CSS once
            if (!document.querySelector('link[data-quill-css]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css';
                link.setAttribute('data-quill-css', '1');
                document.head.appendChild(link);
            }

            if (containerRef.current && !quillRef.current) {
                const editorDiv = document.createElement('div');
                containerRef.current.appendChild(editorDiv);

                quillRef.current = new Quill(editorDiv, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ align: [] }],
                            [{ direction: 'rtl' }],
                            ['link'],
                            ['clean'],
                        ],
                    },
                });

                if (value) quillRef.current.root.innerHTML = value;
                if (dir) quillRef.current.root.setAttribute('dir', dir);

                quillRef.current.on('text-change', () => {
                    const html = quillRef.current.root.innerHTML;
                    onChangeRef.current(html === '<p><br></p>' ? '' : html);
                });
            }
        });

        return () => { quillRef.current = null; };
    }, []);

    // Sync value from outside
    useEffect(() => {
        if (quillRef.current) {
            const current = quillRef.current.root.innerHTML;
            const incoming = value || '';
            if (current !== incoming && incoming !== '') {
                quillRef.current.root.innerHTML = incoming;
            }
        }
    }, [value]);

    return (
        <div
            ref={containerRef}
            className="border border-gray-300 rounded-lg bg-white"
            style={{ minHeight: '200px' }}
        />
    );
};

export default RichTextEditor;
