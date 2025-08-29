import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, Download, Share, Eye, MessageSquare, BookOpen, Edit3, Zap, Minimize2, Maximize2, FileCheck, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DocumentEditorProps {
  onBack: () => void;
  formData: any;
}

export const DocumentEditor = ({ onBack, formData }: DocumentEditorProps) => {
  const [selectedSection, setSelectedSection] = useState("1");
  const [chatInput, setChatInput] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [sectionContent, setSectionContent] = useState<Record<string, string>>({});
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([
    {
      id: "1",
      text: "I'm here to help you with this section. I can help you improve the content, find relevant sources, or answer regulatory questions.",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  // Table of Contents for FDA Briefing Package
  const tableOfContents = [
    { id: "figures", title: "List of Figures", level: 0 },
    { id: "tables", title: "List of Tables", level: 0 },
    { id: "abbreviations", title: "List of Abbreviations", level: 0 },
    { id: "1", title: "1. Introduction", level: 0 },
    { id: "1.1", title: "1.1. Background information on the disease to be treated", level: 1 },
    { id: "1.2", title: "1.2. Background information on the product", level: 1 },
    { id: "1.3", title: "1.3. Regulatory status", level: 1 },
    { id: "1.4", title: "1.4. Rationale for seeking advice", level: 1 },
    { id: "2", title: "2. Overview of product development", level: 0 },
    { id: "2.1", title: "2.1. Quality background information", level: 1 },
    { id: "2.1.1", title: "2.1.1. Active substance", level: 2 },
    { id: "2.1.2", title: "2.1.2. Finished product", level: 2 },
    { id: "2.2", title: "2.2. Non-clinical background information", level: 1 },
    { id: "2.2.1", title: "2.2.1. Pharmacology", level: 2 },
    { id: "2.2.2", title: "2.2.2. Pharmacokinetics", level: 2 },
    { id: "2.2.3", title: "2.2.3. Pharmacodynamics", level: 2 },
    { id: "2.2.4", title: "2.2.4. Toxicology", level: 2 },
    { id: "2.3", title: "2.3. Clinical background information", level: 1 },
    { id: "2.3.1", title: "2.3.1. Clinical pharmacology", level: 2 },
    { id: "2.3.2", title: "2.3.2. Pharmacokinetics", level: 2 },
    { id: "2.3.3", title: "2.3.3. Pharmacodynamics", level: 2 },
    { id: "2.3.4", title: "2.3.4. Clinical efficacy", level: 2 },
    { id: "2.3.5", title: "2.3.5. Clinical safety", level: 2 },
    { id: "3", title: "3. Questions and Applicant's positions", level: 0 },
    { id: "3.1", title: "3.1. Questions on Quality development", level: 1 },
    { id: "3.2", title: "3.2. Multidisciplinary Questions on Quality and Non-clinical development", level: 1 },
    { id: "3.3", title: "3.3. Questions on Non-clinical development", level: 1 },
    { id: "3.4", title: "3.4. Multidisciplinary Questions on Non-clinical and Clinical development", level: 1 },
    { id: "3.5", title: "3.5. Questions on Clinical development", level: 1 },
    { id: "3.6", title: "3.6. Questions on Significant Benefit", level: 1 },
    { id: "3.7", title: "3.7. Other CHMP comments not directly related to the questions", level: 1 },
    { id: "references", title: "List of References", level: 0 },
    { id: "annexes", title: "List of Annexes", level: 0 }
  ];

  const mockContent = {
    "1": `This briefing package provides comprehensive information about ${formData.companyName}'s ${formData.productName} for the treatment of ${formData.indication}. 

The purpose of this document is to support regulatory discussions and provide the scientific rationale for the proposed development program.

Current development stage: ${formData.developmentStage}
Product classification: ${formData.productClassification}

This briefing package has been prepared in accordance with FDA guidance and contains detailed information on quality, non-clinical, and clinical aspects of the development program.`,
    "1.1": `${formData.indication} represents a significant unmet medical need with limited therapeutic options available to patients. The disease affects thousands of patients globally and current standard of care provides only modest clinical benefit.

Key disease characteristics:
• Progressive nature requiring early intervention
• Limited treatment options available
• Significant impact on patient quality of life
• High unmet medical need in the patient population

The target patient population for ${formData.productName} includes patients with confirmed diagnosis of ${formData.indication} who have failed or are intolerant to standard therapy.`,
    "1.2": `${formData.productName} is a ${formData.productClassification.toLowerCase()} being developed by ${formData.companyName} for the treatment of ${formData.indication}.

Product Overview:
• Mechanism of Action: Novel mechanism targeting specific pathway
• Formulation: Optimized formulation for improved bioavailability
• Route of Administration: Patient-friendly administration route
• Development Stage: ${formData.developmentStage}

The product has demonstrated promising preliminary efficacy and safety results in preclinical studies, supporting advancement into clinical development.`,
    "1.3": `${formData.companyName} has engaged with regulatory authorities to discuss the development strategy for ${formData.productName}. 

Current regulatory interactions:
• Pre-IND meetings held with FDA
• Scientific advice sought from EMA
• Orphan designation granted (if applicable)
• Fast track designation received (if applicable)

The regulatory pathway has been established in consultation with health authorities, ensuring alignment on key development milestones and regulatory requirements.`,
    "2": `The development program for ${formData.productName} follows a systematic approach encompassing quality, non-clinical, and clinical development activities.

Development Strategy:
• Comprehensive non-clinical package supporting first-in-human studies
• Adaptive clinical trial design to optimize development efficiency
• Regulatory-aligned development milestones
• Risk-based approach to development activities

This section provides an overview of completed and planned development activities across all disciplines.`,
    "2.1": `The quality development program for ${formData.productName} ensures consistent manufacturing and characterization of the ${formData.productClassification.toLowerCase()}.

Quality Development Activities:
• Manufacturing process development and optimization
• Analytical method development and validation
• Stability studies under ICH conditions
• Comparability assessments for process changes

All quality activities follow current regulatory guidelines and ensure product quality throughout development.`,
    "3": `${formData.companyName} seeks regulatory guidance on the following key development questions for ${formData.productName}:

Key Questions:
1. Clinical Development Strategy
2. Regulatory Pathway Confirmation  
3. Non-clinical Requirements
4. Quality Development Approach
5. Risk Management Strategy

Each question includes detailed scientific rationale and proposed approaches for regulatory consideration and feedback.`
  };

  const sources = [
    { 
      title: "Clinical Study Report - Study 001.pdf", 
      page: "Page 45-67",
      relatedText: "demonstrated promising preliminary efficacy and safety results in preclinical studies",
      fullContent: "The preclinical studies for our novel compound demonstrated promising preliminary efficacy and safety results in preclinical studies across multiple animal models. The primary efficacy endpoint showed a 65% improvement over baseline measurements, with consistent results across different dosing regimens. Safety assessments revealed no significant adverse events at therapeutic doses, with a favorable therapeutic index of >10. These results strongly support advancement to clinical development phases."
    },
    { 
      title: "FDA Guidance - Orphan Drug Development", 
      page: "Section 3.2",
      relatedText: "regulatory pathway has been established in consultation with health authorities",
      fullContent: "Per FDA guidance on orphan drug development, the regulatory pathway has been established in consultation with health authorities through pre-submission meetings and scientific advice procedures. The designated development pathway includes specific milestones for IND submission, clinical development phases, and marketing authorization. This approach ensures alignment with regulatory expectations and facilitates efficient review processes."
    },
    { 
      title: "Investigator Brochure v3.2.pdf", 
      page: "Page 12-15",
      relatedText: "Novel mechanism targeting specific pathway",
      fullContent: "The investigational product represents a novel mechanism targeting specific pathway through selective inhibition of key enzymes involved in disease progression. This mechanism of action differentiates our approach from existing therapies and offers potential for improved efficacy with reduced side effects. Preclinical mechanistic studies confirm target engagement and pathway modulation at therapeutically relevant concentrations."
    }
  ];

  const handleSourceClick = (source: any) => {
    setSelectedSource(source);
    setIsSourceModalOpen(true);
  };

  const renderHighlightedContent = (content: string, highlightText: string) => {
    if (!highlightText || !content.includes(highlightText)) {
      return <span>{content}</span>;
    }
    
    const parts = content.split(highlightText);
    const result: any[] = [];
    
    parts.forEach((part, index) => {
      result.push(<span key={`part-${index}`}>{part}</span>);
      if (index < parts.length - 1) {
        result.push(
          <mark key={`highlight-${index}`} className="bg-yellow-300 px-1 rounded font-semibold">
            {highlightText}
          </mark>
        );
      }
    });
    
    return <span>{result}</span>;
  };

  const aiActions = [
    { label: "Make Shorter", icon: Minimize2 },
    { label: "Expand", icon: Maximize2 },
    { label: "Improve Language", icon: Edit3 },
    { label: "Simplify", icon: Zap }
  ];

  const handleAIAction = (action: string) => {
    if (!selectedSection) return;
    
    const currentContent = sectionContent[selectedSection] || mockContent[selectedSection] || "";
    let newContent = currentContent;
    
    switch (action) {
      case "Make Shorter":
        const sentences = currentContent.split('.');
        newContent = sentences.slice(0, Math.max(2, Math.floor(sentences.length * 0.7))).join('.') + '.';
        break;
      case "Improve Language":
        newContent = currentContent.replace(/\b(significant|important|key)\b/g, "critical")
                                 .replace(/\b(provides|offers)\b/g, "delivers")
                                 .replace(/\b(patients)\b/g, "patients and healthcare providers")
                                 .replace(/\b(development)\b/g, "advancement");
        break;
      case "Expand":
        newContent = currentContent + '\n\nAdditional considerations:\n• Enhanced regulatory alignment with FDA guidance\n• Improved patient outcomes and safety profile\n• Streamlined development approach for faster approval\n• Comprehensive risk mitigation strategies';
        break;
      case "Simplify":
        newContent = currentContent.replace(/\b(comprehensive|extensive|detailed)\b/g, "clear")
                                 .replace(/\b(encompasses|incorporates)\b/g, "includes")
                                 .replace(/\b(methodology|approach)\b/g, "method")
                                 .replace(/\b(substantial|considerable)\b/g, "large");
        break;
      default:
        return;
    }
    
    setSectionContent(prev => ({
      ...prev,
      [selectedSection]: newContent
    }));
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Generate mock AI response
    setTimeout(() => {
      const responses = [
        "Based on the current section content, I recommend adding more specific details about the clinical endpoints. This will strengthen the regulatory submission.",
        "The section looks comprehensive. Consider adding a reference to ICH guidelines for additional regulatory context.",
        "I suggest expanding the safety profile information to address potential regulatory concerns during review.",
        "This section aligns well with FDA guidance. You might want to include additional pharmacokinetic data if available.",
        "Consider restructuring this paragraph to lead with the primary efficacy endpoint for better clarity.",
        "The content is solid. Adding a brief comparison with existing therapies could strengthen the regulatory position."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">FDA Briefing Package</h1>
                  <p className="text-sm text-muted-foreground">{formData.companyName} - {formData.productName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export to Word
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export to PDF
              </Button>
              <Button variant="secondary" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Table of Contents */}
        <div className="w-80 border-r border-border bg-surface/30">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Table of Contents
            </h2>
          </div>
          <ScrollArea className="h-full">
            <div className="p-2">
              {tableOfContents.map((section) => (
                <div
                  key={section.id}
                  className={`p-2 rounded-md cursor-pointer transition-colors ${
                    selectedSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                  style={{ paddingLeft: `${0.5 + section.level * 1}rem` }}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <span className="text-sm">{section.title}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center Panel - Editor */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border bg-surface/30">
            <h3 className="font-semibold text-foreground">
              {tableOfContents.find(s => s.id === selectedSection)?.title}
            </h3>
          </div>
          <div className="flex-1 p-6">
            <Textarea
              value={sectionContent[selectedSection] || mockContent[selectedSection] || "Content will be generated for this section..."}
              onChange={(e) => setSectionContent(prev => ({ ...prev, [selectedSection]: e.target.value }))}
              className="w-full h-full resize-none border-0 focus:ring-0 text-base leading-relaxed"
              placeholder="AI-generated content will appear here..."
            />
          </div>
        </div>

        {/* Right Panel - AI Co-Pilot */}
        <div className="w-96 border-l border-border bg-surface/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              AI4RA Co-Pilot
            </h2>
          </div>

          {/* AI Actions */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">AI Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {aiActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleAIAction(action.label)}
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Sources</h3>
            <div className="space-y-2">
              {sources.map((source, index) => (
                <div 
                  key={index} 
                  className="p-2 bg-muted rounded-lg cursor-pointer hover:bg-primary/10 transition-colors border-2 hover:border-primary/30"
                  onClick={() => handleSourceClick(source)}
                >
                  <p className="text-xs font-medium text-foreground">{source.title}</p>
                  <p className="text-xs text-muted-foreground">{source.page}</p>
                  <p className="text-xs text-blue-600 italic mt-1">📍 Click to highlight: "{source.relatedText.substring(0, 40)}..."</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">Ask Co-Pilot</h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted text-foreground mr-4'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about this section..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                />
                <Button size="sm" onClick={handleSendChat}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Detail Modal */}
      {isSourceModalOpen && selectedSource && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh] shadow-custom-lg">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Source Reference</CardTitle>
                  <CardDescription>{selectedSource.title} - {selectedSource.page}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsSourceModalOpen(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Referenced Text:</h4>
                  <p className="text-blue-800 italic">"{selectedSource.relatedText}"</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-background">
                  <h4 className="font-semibold mb-3">Full Context from Source:</h4>
                  <div className="text-base leading-relaxed">
                    {renderHighlightedContent(selectedSource.fullContent, selectedSource.relatedText)}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Source:</strong> {selectedSource.title}</p>
                  <p><strong>Location:</strong> {selectedSource.page}</p>
                  <p><strong>Usage:</strong> This text was used to generate content in the current document section.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[90vh] shadow-custom-lg">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Preview</CardTitle>
                  <CardDescription>Full document preview</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-full p-6">
                <div className="prose max-w-none">
                  <h1 className="text-2xl font-bold mb-4">FDA Briefing Package</h1>
                  <p className="text-muted-foreground mb-6">
                    {formData.companyName} - {formData.productName} for {formData.indication}
                  </p>
                  
                  {tableOfContents.map((section) => (
                    <div key={section.id} className="mb-6">
                      <h3 className="font-semibold mb-2">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sectionContent[section.id] || mockContent[section.id] || "Content will be generated for this section..."}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};