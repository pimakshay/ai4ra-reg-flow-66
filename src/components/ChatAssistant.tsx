import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, FileSearch, HelpCircle, BookOpen, Scale, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  onBack: () => void;
}

export const ChatAssistant = ({ onBack }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI regulatory assistant. I can help you with FDA/EMA guidance, regulatory strategies, and document queries. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking about: "${inputValue}". This is a sophisticated regulatory question that requires careful consideration of FDA/EMA guidelines. Let me provide you with a comprehensive analysis based on current regulatory frameworks...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    {
      icon: Scale,
      title: "FDA vs EMA Differences",
      question: "What are the key differences between FDA and EMA orphan drug designation requirements?",
      category: "Regulatory Comparison"
    },
    {
      icon: FileSearch,
      title: "Briefing Package Requirements",
      question: "What should be included in a Type B meeting briefing package for FDA?",
      category: "Documentation"
    },
    {
      icon: Lightbulb,
      title: "Development Strategy",
      question: "How should I structure my regulatory strategy for a rare disease indication?",
      category: "Strategy"
    },
    {
      icon: HelpCircle,
      title: "Submission Timeline",
      question: "What is the typical timeline for FDA breakthrough therapy designation review?",
      category: "Process"
    },
    {
      icon: BookOpen,
      title: "Guidance Documents",
      question: "Can you summarize the latest FDA guidance on adaptive trial designs?",
      category: "Guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Regulatory Assistant</h1>
                <p className="text-sm text-muted-foreground">Get expert regulatory guidance instantly</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col shadow-custom-lg">
              <CardHeader className="border-b border-border">
                <CardTitle>Chat with AI Assistant</CardTitle>
                <CardDescription>
                  Ask regulatory questions, search documents, or get strategic guidance
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about regulatory requirements, strategies, or document guidance..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-custom-md sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
                <CardDescription>
                  Click on any question to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedQuestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors group"
                      onClick={() => setInputValue(suggestion.question)}
                    >
                      <div className="flex items-start gap-3">
                        <suggestion.icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                            {suggestion.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">Popular Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {['FDA Guidance', 'EMA Requirements', 'Orphan Drug', 'Clinical Trials', 'Regulatory Strategy'].map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setInputValue(`Tell me about ${topic.toLowerCase()}`)}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};