import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ModernCardProps {
  title: string;
  body: string;
  href: string;
}

export function ModernCard({ title, body, href }: ModernCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{body}</CardDescription>
        <Button asChild variant="outline" size="sm">
          <a href={href}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  );
}
