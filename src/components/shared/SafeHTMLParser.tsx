interface Props {
  htmlString: string;
}

const safeHTMLParserClasses = `
  [&>div>h3]:text-3xl [&>div>h3]:mb-2 [&>div>h3]:font-medium [&>div>h4]:text-xl [&>div>h4]:mb-1.5 [&>div>h4]:font-medium [&>div>h5]:text-lg [&>div>h5]:mb-1.25 [&>div>h5]:italic [&>div>p]:mb-1.25
  [&>div>ul]:list-disc [&>div>ul]:pl-6 [&>div>ul]:mb-2 [&>div>ul>li]:mb-1
  [&>div>ol]:list-decimal [&>div>ol]:pl-6 [&>div>ol>li]:mb-1
  [&>div>blockquote]:border-l-4 [&>div>blockquote]:pl-4 [&>div>blockquote]:border-primary [&>div>blockquote]:text-primary [&>div>blockquote]:bg-muted [&>div>blockquote]:p-4 [&>div>blockquote]:mb-4
`;

export const SafeHTMLParser = ({ htmlString }: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className={safeHTMLParserClasses} 
    />
  );
};
