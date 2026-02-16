export default defineAppConfig({
  ui: {
    button: {
      variants: {
        variant: {
          elevated: 'elevated'
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'elevated',
          class: 'bg-primary'
        },
      ],
      defaultVariants: {
        variant: 'solid'
      }
    }
  }
})
