import { CodeIcon, PencilAltIcon } from "@heroicons/react/solid"
import { useState, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import Button from "../Base/Button"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula as highlighterTheme } from "react-syntax-highlighter/dist/cjs/styles/prism"

export default function Markdown({ editable, children = "### Default" }) {
  const [markdown, setMarkdown] = useState(children)
  const [editing, setEditing] = useState(false)

  const autoFocus = useCallback(node => node && node.focus(), [])

  return (
    <div>
      {editable && (
        <div className="flex justify-between items-center mb-3">
          <div className="text-2xl font-medium">Submit your solution</div>

          {editing ? (
            <Button Icon={CodeIcon} onClick={() => setEditing(false)}>
              Preview
            </Button>
          ) : (
            <Button Icon={PencilAltIcon} onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      )}

      <div>
        {editing ? (
          <textarea
            ref={autoFocus}
            rows={10}
            className="form-textarea shadow-sm focus:border-indigo-500 block w-full border border-gray-300 rounded-md"
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
          />
        ) : (
          markdown.trim() && (
            <div className="border px-2 py-2 prose ">
              <ReactMarkdown
                className="solution"
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        style={highlighterTheme}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )
        )}
      </div>
    </div>
  )
}
